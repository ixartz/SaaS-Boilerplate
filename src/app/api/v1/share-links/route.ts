import { randomBytes } from 'node:crypto';

import { and, desc, eq, gt, isNull } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { requireMembership } from '@/lib/auth';
import { runWithOrgContext } from '@/lib/db-context';
import { problemJson } from '@/libs/api/errors';
import { buildCursorPagination, cursorQuerySchema } from '@/libs/api/pagination';
import { parseJson, parseQuery } from '@/libs/api/validate';
import { db } from '@/libs/DB';
import { shareLinksSchema } from '@/models/Schema';

const createSchema = z.object({
  projectId: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  hideFinancials: z.boolean().optional(),
  isActive: z.boolean().optional(),
  expiresAt: z.string().datetime().optional(),
  password: z.string().optional(),
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

    return await runWithOrgContext({ orgId, userId: user.id, role: membership.role }, async () => {
      const where = and(
        eq(shareLinksSchema.orgId, orgId),
        isNull(shareLinksSchema.deletedAt),
        q.cursor ? gt(shareLinksSchema.id, q.cursor) : undefined,
      );

      const rows = await db
        .select()
        .from(shareLinksSchema)
        .where(where as any)
        .orderBy(desc(shareLinksSchema.createdAt))
        .limit(q.limit ?? 20);

      const { nextCursor } = buildCursorPagination(rows, q.limit ?? 20);
      const items = rows;

      return new Response(JSON.stringify({ ok: true, items, nextCursor }), {
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to fetch share links', status: 500, detail: e?.message });
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
      'ACCOUNTANT',
    ]);

    const payload = parsed.data;
    return await runWithOrgContext({ orgId, userId: user.id, role: membership.role }, async () => {
      // Generate unique token
      const token = randomBytes(32).toString('hex');

      const [row] = await db
        .insert(shareLinksSchema)
        .values({
          orgId,
          projectId: payload.projectId,
          name: payload.name,
          description: payload.description ?? null,
          token,
          hideFinancials: payload.hideFinancials ?? false,
          isActive: payload.isActive ?? true,
          expiresAt: payload.expiresAt ? new Date(payload.expiresAt) : null,
          password: payload.password ?? null,
          createdBy: user.id,
        })
        .returning();

      return new Response(JSON.stringify({ ok: true, item: row }), {
        status: 201,
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to create share link', status: 500, detail: e?.message });
  }
}
