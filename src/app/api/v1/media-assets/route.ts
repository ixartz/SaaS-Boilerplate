import { and, desc, eq, gt, isNull } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { requireMembership } from '@/lib/auth';
import { runWithOrgContext } from '@/lib/db-context';
import { problemJson, serverError } from '@/libs/api/errors';
import { buildCursorPagination, cursorQuerySchema } from '@/libs/api/pagination';
import { parseJson, parseQuery } from '@/libs/api/validate';
import { db } from '@/libs/DB';
import { mediaAssetsSchema, mediaKindEnum } from '@/models/Schema';

const createSchema = z.object({
  dailyLogId: z.string().uuid().optional(),
  cloudinaryPublicId: z.string().min(1),
  cloudinaryUrl: z.string().url(),
  kind: z.enum(mediaKindEnum.enumValues),
  filename: z.string().min(1),
  mimeType: z.string().optional(),
  size: z.number().int().min(0).optional(),
  width: z.number().int().min(0).optional(),
  height: z.number().int().min(0).optional(),
  duration: z.number().int().min(0).optional(),
  caption: z.string().optional(),
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
        eq(mediaAssetsSchema.orgId, orgId),
        isNull(mediaAssetsSchema.deletedAt),
        q.cursor ? gt(mediaAssetsSchema.id, q.cursor) : undefined,
      );

      const rows = await db
        .select()
        .from(mediaAssetsSchema)
        .where(where as any)
        .orderBy(desc(mediaAssetsSchema.createdAt))
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
        .insert(mediaAssetsSchema)
        .values({
          orgId,
          dailyLogId: payload.dailyLogId ?? null,
          cloudinaryPublicId: payload.cloudinaryPublicId,
          cloudinaryUrl: payload.cloudinaryUrl,
          kind: payload.kind as any,
          filename: payload.filename,
          mimeType: payload.mimeType ?? null,
          size: payload.size ?? null,
          width: payload.width ?? null,
          height: payload.height ?? null,
          duration: payload.duration ?? null,
          caption: payload.caption ?? null,
          uploadedBy: user.id,
        })
        .returning();

      return new Response(JSON.stringify({ ok: true, item: row }), {
        status: 201,
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to create media asset', status: 500, detail: e?.message });
  }
}
