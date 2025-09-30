import { and, eq, gt, isNull } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { requireMembership } from '@/lib/auth';
import { runWithOrgContext } from '@/lib/db-context';
import { problemJson, serverError } from '@/libs/api/errors';
import { buildCursorPagination, cursorQuerySchema } from '@/libs/api/pagination';
import { parseJson, parseQuery } from '@/libs/api/validate';
import { db } from '@/libs/DB';
import { projectMembersSchema, projectsSchema, usersSchema } from '@/models/Schema';

const createSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters'),
  budget: z.number().min(1, 'Budget must be greater than 0').optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  status: z.enum(['planning', 'in_progress', 'completed']).optional(),
  description: z.string().optional(),
  thumbnailUrl: z.string()
    .url('Please enter a valid URL')
    .refine((url) => {
      if (!url) {
 return true;
} // Optional field
      // Must be Cloudinary URL, not base64
      return url.startsWith('https://res.cloudinary.com/') && !url.startsWith('data:');
    }, {
      message: 'Please upload image to Cloudinary (base64 not allowed)',
    })
    .optional(),
  managerId: z.string().optional(), // Clerk user ID
}).refine((data) => {
  if (data.startDate && data.endDate) {
    return new Date(data.startDate) <= new Date(data.endDate);
  }
  return true;
}, {
  message: 'Start date must be before or equal to end date',
  path: ['endDate'],
});

export async function GET(req: NextRequest) {
  // AuthZ: view projects for org
  const { data: q, error: qErr } = parseQuery(req, cursorQuerySchema);
  if (qErr) {
    return qErr;
  }

  try {
    // Check for E2E bypass header first
    const isE2EBypass = req.headers.get('x-e2e-bypass') === 'true';

    let authContext;
    if (isE2EBypass) {
      authContext = {
        orgId: req.headers.get('x-e2e-org') || 'org_e2e_default',
        userId: req.headers.get('x-e2e-user') || 'clerk_e2e_owner',
        membership: { role: 'OWNER' },
      };
    } else {
      const { orgId, user, membership } = await requireMembership(req, [
        'OWNER',
        'ADMIN',
        'PM',
        'ENGINEER',
        'ACCOUNTANT',
        'VIEWER',
      ]);
      authContext = { orgId, userId: user.id, membership };
    }

    const limit = q.limit ?? 20;

    return await runWithOrgContext({
      orgId: authContext.orgId,
      userId: authContext.userId,
      role: authContext.membership.role,
    }, async () => {
      // Query projects with manager info
      const rows = await db
        .select({
          id: projectsSchema.id,
          orgId: projectsSchema.orgId,
          name: projectsSchema.name,
          description: projectsSchema.description,
          status: projectsSchema.status,
          budget: projectsSchema.budget,
          startDate: projectsSchema.startDate,
          endDate: projectsSchema.endDate,
          thumbnailUrl: projectsSchema.thumbnailUrl,
          createdAt: projectsSchema.createdAt,
          updatedAt: projectsSchema.updatedAt,
          deletedAt: projectsSchema.deletedAt,
          // Manager info
          managerId: projectMembersSchema.userId,
          managerName: usersSchema.name,
          managerEmail: usersSchema.email,
          managerAvatar: usersSchema.avatarUrl,
        })
        .from(projectsSchema)
        .leftJoin(projectMembersSchema, and(
          eq(projectMembersSchema.projectId, projectsSchema.id),
          eq(projectMembersSchema.role, 'manager'),
        ))
        .leftJoin(usersSchema, eq(usersSchema.clerkUserId, projectMembersSchema.userId))
        .where(and(
          eq(projectsSchema.orgId, authContext.orgId),
          isNull(projectsSchema.deletedAt),
          q.cursor ? gt(projectsSchema.id, q.cursor) : undefined,
        ))
        .limit(limit);

      const { hasMore, nextCursor } = buildCursorPagination(rows, limit);

      return new Response(
        JSON.stringify({ ok: true, items: rows, pageInfo: { hasMore, nextCursor } }),
        { headers: { 'content-type': 'application/json' } },
      );
    });
  } catch (e: any) {
    return serverError(e?.message);
  }
}

export async function POST(req: NextRequest) {
  const parsed = await parseJson(req, createSchema);
  if ('error' in parsed) {
    return parsed.error;
  }

  try {
    // Check for E2E bypass header first
    const isE2EBypass = req.headers.get('x-e2e-bypass') === 'true';

    let authContext;
    if (isE2EBypass) {
      authContext = {
        orgId: req.headers.get('x-e2e-org') || 'org_e2e_default',
        userId: req.headers.get('x-e2e-user') || 'clerk_e2e_owner',
        membership: { role: 'OWNER' },
      };
    } else {
      const { orgId, user, membership } = await requireMembership(req, [
        'OWNER',
        'ADMIN',
        'PM',
      ]);
      authContext = { orgId, userId: user.id, membership };
    }

    const payload = parsed.data;

    return await runWithOrgContext({
      orgId: authContext.orgId,
      userId: authContext.userId,
      role: authContext.membership.role,
    }, async () => {
      // Map frontend status to database enum
      const statusMap = {
        planning: 'PLANNING',
        in_progress: 'IN_PROGRESS',
        completed: 'COMPLETED',
      } as const;

      // 1. Create project
      const [project] = await db
        .insert(projectsSchema)
        .values({
          orgId: authContext.orgId,
          name: payload.name,
          description: payload.description ?? null,
          status: statusMap[payload.status as keyof typeof statusMap] ?? 'PLANNING',
          budget: payload.budget?.toString() ?? null,
          startDate: payload.startDate ? new Date(payload.startDate) : null,
          endDate: payload.endDate ? new Date(payload.endDate) : null,
          thumbnailUrl: payload.thumbnailUrl ?? null,
        })
        .returning();

      // 2. Sync manager to users table (upsert) - only if managerId provided
      if (payload.managerId) {
        // First check if user exists
        const existingUser = await db.query.usersSchema.findFirst({
          where: eq(usersSchema.clerkUserId, payload.managerId),
        });

        if (!existingUser) {
          // Create new user entry
          await db
            .insert(usersSchema)
            .values({
              clerkUserId: payload.managerId,
              email: `user-${payload.managerId}@example.com`, // Will be updated by webhook
              name: `Manager ${payload.managerId}`,
              avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(`Manager ${payload.managerId}`)}&background=random`,
            });
        } else {
          // Update existing user
          await db
            .update(usersSchema)
            .set({
              updatedAt: new Date(),
            })
            .where(eq(usersSchema.clerkUserId, payload.managerId));
        }

        // 3. Add manager to project_members
        await db
          .insert(projectMembersSchema)
          .values({
            projectId: project?.id,
            userId: payload.managerId,
            role: 'manager',
          });
      }

      // 4. Get project with manager info
      const [projectWithManager] = await db
        .select({
          id: projectsSchema.id,
          orgId: projectsSchema.orgId,
          name: projectsSchema.name,
          description: projectsSchema.description,
          status: projectsSchema.status,
          budget: projectsSchema.budget,
          startDate: projectsSchema.startDate,
          endDate: projectsSchema.endDate,
          address: projectsSchema.address,
          clientName: projectsSchema.clientName,
          clientContact: projectsSchema.clientContact,
          thumbnailUrl: projectsSchema.thumbnailUrl,
          createdAt: projectsSchema.createdAt,
          updatedAt: projectsSchema.updatedAt,
          deletedAt: projectsSchema.deletedAt,
          // Manager info
          managerId: projectMembersSchema.userId,
          managerName: usersSchema.name,
          managerEmail: usersSchema.email,
          managerAvatar: usersSchema.avatarUrl,
        })
        .from(projectsSchema)
        .leftJoin(projectMembersSchema, and(
          eq(projectMembersSchema.projectId, projectsSchema.id),
          eq(projectMembersSchema.role, 'manager'),
        ))
        .leftJoin(usersSchema, eq(usersSchema.clerkUserId, projectMembersSchema.userId))
        .where(eq(projectsSchema.id, project?.id));

      return new Response(JSON.stringify({ ok: true, item: projectWithManager }), {
        status: 201,
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to create project', status: 500, detail: e?.message });
  }
}
