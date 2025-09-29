import { and, desc, eq, gt, isNull } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { requireMembership } from '@/lib/auth';
import { runWithOrgContext } from '@/lib/db-context';
import { problemJson, serverError } from '@/libs/api/errors';
import { buildCursorPagination, cursorQuerySchema } from '@/libs/api/pagination';
import { parseJson, parseQuery } from '@/libs/api/validate';
import { db } from '@/libs/DB';
import { projectsSchema, projectStatusEnum } from '@/models/Schema';

const createSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(projectStatusEnum.enumValues).optional(),
  budget: z.string().transform(v => (v === undefined ? undefined : v)).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  address: z.string().optional(),
  clientName: z.string().optional(),
  clientContact: z.string().optional(),
});

export async function GET(req: NextRequest) {
  // AuthZ: view projects for org
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
        eq(projectsSchema.orgId, orgId),
        isNull(projectsSchema.deletedAt),
        q.cursor ? gt(projectsSchema.id, q.cursor) : undefined,
      );

      const rows = await db
        .select()
        .from(projectsSchema)
        .where(where as any)
        .orderBy(desc(projectsSchema.createdAt))
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
        .insert(projectsSchema)
        .values({
          orgId,
          name: payload.name,
          description: payload.description,
          status: (payload.status as any) ?? 'PLANNING',
          budget: payload.budget as any,
          startDate: payload.startDate ? new Date(payload.startDate) : null,
          endDate: payload.endDate ? new Date(payload.endDate) : null,
          address: payload.address ?? null,
          clientName: payload.clientName ?? null,
          clientContact: payload.clientContact ?? null,
        })
        .returning();

      return new Response(JSON.stringify({ ok: true, item: row }), {
        status: 201,
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to create project', status: 500, detail: e?.message });
  }
}
