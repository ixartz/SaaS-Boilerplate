import { and, eq, isNull } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { requireMembership } from '@/lib/auth';
import { runWithOrgContext } from '@/lib/db-context';
import { badRequest, notFound, problemJson, serverError } from '@/libs/api/errors';
import { parseJson } from '@/libs/api/validate';
import { db } from '@/libs/DB';
import { projectMembersSchema, projectsSchema, usersSchema } from '@/models/Schema';

const idSchema = z.object({ id: z.string().uuid() });

const updateSchema = z
  .object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    status: z.enum(['planning', 'in_progress', 'completed']).optional(),
    budget: z.number().min(1).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    thumbnailUrl: z.string().url().optional(),
    managerId: z.string().min(1).optional(),
  })
  .refine(v => Object.keys(v).length > 0, { message: 'At least one field is required' })
  .refine((data) => {
    if (data.startDate && data.endDate) {
      return new Date(data.startDate) <= new Date(data.endDate);
    }
    return true;
  }, {
    message: 'Start date must be before or equal to end date',
    path: ['endDate'],
  });

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const parsedId = idSchema.safeParse(params);
  if (!parsedId.success) {
    return badRequest('Invalid id');
  }

  try {
    const { orgId, user, membership } = await requireMembership(_req, [
      'OWNER',
      'ADMIN',
      'PM',
      'ENGINEER',
      'ACCOUNTANT',
      'VIEWER',
    ]);

    return await runWithOrgContext({ orgId, userId: user.id, role: membership.role }, async () => {
      const rows = await db
        .select()
        .from(projectsSchema)
        .where(and(eq(projectsSchema.id, parsedId.data.id), eq(projectsSchema.orgId, orgId), isNull(projectsSchema.deletedAt)));
      if (rows.length === 0) {
        return notFound('Project not found');
      }
      return new Response(JSON.stringify({ ok: true, item: rows[0] }), {
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return serverError(e?.message);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const parsedId = idSchema.safeParse(params);
  if (!parsedId.success) {
    return badRequest('Invalid id');
  }

  const parsed = await parseJson(req, updateSchema);
  if ('error' in parsed) {
    return parsed.error;
  }

  try {
    const { orgId, user, membership } = await requireMembership(req, [
      'OWNER',
      'ADMIN',
      'PM',
    ]);

    const payload = parsed.data;
    return await runWithOrgContext({ orgId, userId: user.id, role: membership.role }, async () => {
      // Map frontend status to database enum
      const statusMap = {
        planning: 'PLANNING',
        in_progress: 'IN_PROGRESS',
        completed: 'COMPLETED',
      } as const;

      // Update project
      const [row] = await db
        .update(projectsSchema)
        .set({
          name: payload.name,
          description: payload.description,
          status: payload.status ? statusMap[payload.status as keyof typeof statusMap] : undefined,
          budget: payload.budget?.toString(),
          startDate: payload.startDate ? new Date(payload.startDate) : undefined,
          endDate: payload.endDate ? new Date(payload.endDate) : undefined,
          thumbnailUrl: payload.thumbnailUrl,
        })
        .where(and(eq(projectsSchema.id, parsedId.data.id), eq(projectsSchema.orgId, orgId), isNull(projectsSchema.deletedAt)))
        .returning();

      if (!row) {
        return notFound('Project not found');
      }

      // Handle manager update if managerId provided
      if (payload.managerId) {
        // Sync manager to users table (upsert)
        const existingUser = await db.query.usersSchema.findFirst({
          where: eq(usersSchema.clerkUserId, payload.managerId),
        });

        if (!existingUser) {
          await db
            .insert(usersSchema)
            .values({
              clerkUserId: payload.managerId,
              email: `user-${payload.managerId}@example.com`,
              name: `Manager ${payload.managerId}`,
              avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(`Manager ${payload.managerId}`)}&background=random`,
            });
        }

        // Update or create project member
        await db
          .insert(projectMembersSchema)
          .values({
            projectId: row.id,
            userId: payload.managerId,
            role: 'manager',
          })
          .onConflictDoUpdate({
            target: [projectMembersSchema.projectId, projectMembersSchema.userId],
            set: {
              role: 'manager',
              updatedAt: new Date(),
            },
          });
      }

      return new Response(JSON.stringify({ ok: true, item: row }), {
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to update project', status: 500, detail: e?.message });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const parsedId = idSchema.safeParse(params);
  if (!parsedId.success) {
    return badRequest('Invalid id');
  }

  try {
    const { orgId, user, membership } = await requireMembership(req, ['OWNER', 'ADMIN']);

    return await runWithOrgContext({ orgId, userId: user.id, role: membership.role }, async () => {
      // Soft delete project
      const [row] = await db
        .update(projectsSchema)
        .set({ deletedAt: new Date() })
        .where(and(eq(projectsSchema.id, parsedId.data.id), eq(projectsSchema.orgId, orgId), isNull(projectsSchema.deletedAt)))
        .returning();

      if (!row) {
        return notFound('Project not found');
      }

      // Soft delete related project_members
      await db
        .update(projectMembersSchema)
        .set({ deletedAt: new Date() })
        .where(eq(projectMembersSchema.projectId, parsedId.data.id));

      return new Response(JSON.stringify({ ok: true }), {
        status: 204,
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to delete project', status: 500, detail: e?.message });
  }
}
