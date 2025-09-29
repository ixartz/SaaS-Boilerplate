import { and, eq, isNull } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { requireMembership } from '@/lib/auth';
import { runWithOrgContext } from '@/lib/db-context';
import { badRequest, notFound, problemJson, serverError } from '@/libs/api/errors';
import { parseJson } from '@/libs/api/validate';
import { db } from '@/libs/DB';
import { tasksSchema, taskStatusEnum } from '@/models/Schema';

const idSchema = z.object({ id: z.string().uuid() });

const updateSchema = z
  .object({
    projectId: z.string().uuid().optional(),
    categoryId: z.string().uuid().optional(),
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    status: z.enum(taskStatusEnum.enumValues).optional(),
    priority: z.number().int().min(0).max(2).optional(),
    estimatedHours: z.string().optional(),
    actualHours: z.string().optional(),
    dueDate: z.string().datetime().nullable().optional(),
    assignedTo: z.string().nullable().optional(),
    order: z.number().int().min(0).optional(),
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
        .from(tasksSchema)
        .where(and(eq(tasksSchema.id, parsedId.data.id), eq(tasksSchema.orgId, orgId), isNull(tasksSchema.deletedAt)));
      if (rows.length === 0) {
        return notFound('Task not found');
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
        .update(tasksSchema)
        .set({
          projectId: payload.projectId,
          categoryId: payload.categoryId,
          name: payload.name,
          description: payload.description,
          status: payload.status as any,
          priority: payload.priority,
          estimatedHours: payload.estimatedHours as any,
          actualHours: payload.actualHours as any,
          dueDate: payload.dueDate ? new Date(payload.dueDate) : undefined,
          assignedTo: payload.assignedTo,
          order: payload.order,
        })
        .where(and(eq(tasksSchema.id, parsedId.data.id), eq(tasksSchema.orgId, orgId), isNull(tasksSchema.deletedAt)))
        .returning();

      if (!row) {
        return notFound('Task not found');
      }
      return new Response(JSON.stringify({ ok: true, item: row }), {
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to update task', status: 500, detail: e?.message });
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
        .update(tasksSchema)
        .set({ deletedAt: new Date() })
        .where(and(eq(tasksSchema.id, parsedId.data.id), eq(tasksSchema.orgId, orgId), isNull(tasksSchema.deletedAt)))
        .returning();
      if (!row) {
        return notFound('Task not found');
      }
      return new Response(JSON.stringify({ ok: true }), {
        status: 204,
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to delete task', status: 500, detail: e?.message });
  }
}
