import { and, desc, eq, gt, isNull } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { requireMembership } from '@/lib/auth';
import { runWithOrgContext } from '@/lib/db-context';
import { problemJson, serverError } from '@/libs/api/errors';
import { buildCursorPagination, cursorQuerySchema } from '@/libs/api/pagination';
import { parseJson, parseQuery } from '@/libs/api/validate';
import { db } from '@/libs/DB';
import { transactionsSchema, transactionTypeEnum } from '@/models/Schema';

const createSchema = z.object({
  projectId: z.string().uuid(),
  type: z.enum(transactionTypeEnum.enumValues),
  amount: z.string().min(1),
  description: z.string().min(1),
  category: z.string().optional(),
  vendor: z.string().optional(),
  reference: z.string().optional(),
  transactionDate: z.string().datetime(),
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
      'ACCOUNTANT',
      'VIEWER',
    ]);

    const limit = q.limit ?? 20;

    return await runWithOrgContext({ orgId, userId: user.id, role: membership.role }, async () => {
      const where = and(
        eq(transactionsSchema.orgId, orgId),
        isNull(transactionsSchema.deletedAt),
        q.cursor ? gt(transactionsSchema.id, q.cursor) : undefined,
      );

      const rows = await db
        .select()
        .from(transactionsSchema)
        .where(where as any)
        .orderBy(desc(transactionsSchema.createdAt))
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
      'ACCOUNTANT',
    ]);

    const payload = parsed.data;

    return await runWithOrgContext({ orgId, userId: user.id, role: membership.role }, async () => {
      const [row] = await db
        .insert(transactionsSchema)
        .values({
          orgId,
          projectId: payload.projectId,
          type: payload.type as any,
          amount: payload.amount as any,
          description: payload.description,
          category: payload.category ?? null,
          vendor: payload.vendor ?? null,
          reference: payload.reference ?? null,
          transactionDate: new Date(payload.transactionDate),
          createdBy: user.id,
        })
        .returning();

      return new Response(JSON.stringify({ ok: true, item: row }), {
        status: 201,
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to create transaction', status: 500, detail: e?.message });
  }
}
