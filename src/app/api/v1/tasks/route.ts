import { and, desc, eq, gt, isNull } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { requireMembership } from '@/lib/auth';
import { runWithOrgContext } from '@/lib/db-context';
import { problemJson, serverError } from '@/libs/api/errors';
import { buildCursorPagination, cursorQuerySchema } from '@/libs/api/pagination';
import { parseJson, parseQuery } from '@/libs/api/validate';
import { db } from '@/libs/DB';
import { tasksSchema, taskStatusEnum } from '@/models/Schema';

const createSchema = z.object({
  projectId: z.string().uuid(),
  categoryId: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(taskStatusEnum.enumValues).optional(),
  priority: z.number().int().min(0).max(2).optional(),
  estimatedHours: z.string().transform(v => (v === undefined ? undefined : v)).optional(),
  actualHours: z.string().transform(v => (v === undefined ? undefined : v)).optional(),
  dueDate: z.string().datetime().optional(),
  assignedTo: z.string().optional(),
  order: z.number().int().min(0).optional(),
});

export async function GET(req: NextRequest) {
  const { data: q, error: qErr } = parseQuery(req, cursorQuerySchema);
  if (qErr) {
    return qErr;
  }

  try {
    const { orgId, user, membership } = await requireMembership(req, [
      'OWNER',
      'ADMIN',
      'PM',
      'ENGINEER',
      'ACCOUNTANT',
      'VIEWER',
    ]);

    const limit = q.limit ?? 20;

    return await runWithOrgContext({ orgId, userId: user.id, role: membership.role }, async () => {
      const where = and(
        eq(tasksSchema.orgId, orgId),
        isNull(tasksSchema.deletedAt),
        q.cursor ? gt(tasksSchema.id, q.cursor) : undefined,
      );

      const rows = await db
        .select()
        .from(tasksSchema)
        .where(where as any)
        .orderBy(desc(tasksSchema.createdAt))
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
    const { orgId, user, membership } = await requireMembership(req, [
      'OWNER',
      'ADMIN',
      'PM',
    ]);

    const payload = parsed.data;

    return await runWithOrgContext({ orgId, userId: user.id, role: membership.role }, async () => {
      const [row] = await db
        .insert(tasksSchema)
        .values({
          orgId,
          projectId: payload.projectId,
          categoryId: payload.categoryId,
          name: payload.name,
          description: payload.description,
          status: (payload.status as any) ?? 'WAITING',
          priority: payload.priority ?? 0,
          estimatedHours: payload.estimatedHours as any,
          actualHours: payload.actualHours as any,
          dueDate: payload.dueDate ? new Date(payload.dueDate) : null,
          assignedTo: payload.assignedTo ?? null,
          order: payload.order ?? 0,
        })
        .returning();

      return new Response(JSON.stringify({ ok: true, item: row }), {
        status: 201,
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to create task', status: 500, detail: e?.message });
  }
}
