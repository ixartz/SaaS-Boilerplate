import { and, eq, isNull } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { requireMembership } from '@/lib/auth';
import { runWithOrgContext } from '@/lib/db-context';
import { badRequest, notFound, problemJson, serverError } from '@/libs/api/errors';
import { parseJson } from '@/libs/api/validate';
import { db } from '@/libs/DB';
import { projectsSchema, projectStatusEnum } from '@/models/Schema';

const idSchema = z.object({ id: z.string().uuid() });

const updateSchema = z
  .object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    status: z.enum(projectStatusEnum.enumValues).optional(),
    budget: z.string().optional(),
    startDate: z.string().datetime().nullable().optional(),
    endDate: z.string().datetime().nullable().optional(),
    address: z.string().nullable().optional(),
    clientName: z.string().nullable().optional(),
    clientContact: z.string().nullable().optional(),
  })
  .refine(v => Object.keys(v).length > 0, { message: 'At least one field is required' });

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
      const [row] = await db
        .update(projectsSchema)
        .set({
          name: payload.name,
          description: payload.description,
          status: payload.status as any,
          budget: payload.budget as any,
          startDate: payload.startDate ? new Date(payload.startDate) : undefined,
          endDate: payload.endDate ? new Date(payload.endDate) : undefined,
          address: payload.address,
          clientName: payload.clientName,
          clientContact: payload.clientContact,
        })
        .where(and(eq(projectsSchema.id, parsedId.data.id), eq(projectsSchema.orgId, orgId), isNull(projectsSchema.deletedAt)))
        .returning();

      if (!row) {
        return notFound('Project not found');
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
      const [row] = await db
        .update(projectsSchema)
        .set({ deletedAt: new Date() })
        .where(and(eq(projectsSchema.id, parsedId.data.id), eq(projectsSchema.orgId, orgId), isNull(projectsSchema.deletedAt)))
        .returning();
      if (!row) {
        return notFound('Project not found');
      }
      return new Response(JSON.stringify({ ok: true }), {
        status: 204,
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to delete project', status: 500, detail: e?.message });
  }
}
