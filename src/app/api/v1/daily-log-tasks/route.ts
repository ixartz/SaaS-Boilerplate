import { and, desc, eq, gt, isNull } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { requireMembership } from '@/lib/auth';
import { runWithOrgContext } from '@/lib/db-context';
import { problemJson, serverError } from '@/libs/api/errors';
import { buildCursorPagination, cursorQuerySchema } from '@/libs/api/pagination';
import { parseJson, parseQuery } from '@/libs/api/validate';
import { db } from '@/libs/DB';
import { dailyLogTasksSchema, logTaskStatusEnum } from '@/models/Schema';

const createSchema = z.object({
  dailyLogId: z.string().uuid(),
  taskId: z.string().uuid(),
  status: z.enum(logTaskStatusEnum.enumValues).optional(),
  progress: z.number().int().min(0).max(100).optional(),
  notes: z.string().optional(),
  hoursWorked: z.string().transform(v => (v === undefined ? undefined : v)).optional(),
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
        eq(dailyLogTasksSchema.orgId, orgId),
        isNull(dailyLogTasksSchema.deletedAt),
        q.cursor ? gt(dailyLogTasksSchema.id, q.cursor) : undefined,
      );

      const rows = await db
        .select()
        .from(dailyLogTasksSchema)
        .where(where as any)
        .orderBy(desc(dailyLogTasksSchema.createdAt))
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
      'ENGINEER',
    ]);

    const payload = parsed.data;

    return await runWithOrgContext({ orgId, userId: user.id, role: membership.role }, async () => {
      const [row] = await db
        .insert(dailyLogTasksSchema)
        .values({
          orgId,
          dailyLogId: payload.dailyLogId,
          taskId: payload.taskId,
          status: (payload.status as any) ?? 'WAITING',
          progress: payload.progress ?? 0,
          notes: payload.notes ?? null,
          hoursWorked: payload.hoursWorked as any,
        })
        .returning();

      return new Response(JSON.stringify({ ok: true, item: row }), {
        status: 201,
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to create daily log task', status: 500, detail: e?.message });
  }
}
