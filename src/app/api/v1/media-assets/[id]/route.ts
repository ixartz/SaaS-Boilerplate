import { and, eq, isNull } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { requireMembership } from '@/lib/auth';
import { runWithOrgContext } from '@/lib/db-context';
import { badRequest, notFound, problemJson, serverError } from '@/libs/api/errors';
import { parseJson } from '@/libs/api/validate';
import { db } from '@/libs/DB';
import { mediaAssetsSchema, mediaKindEnum } from '@/models/Schema';

const idSchema = z.object({ id: z.string().uuid() });

const updateSchema = z
  .object({
    dailyLogId: z.string().uuid().nullable().optional(),
    cloudinaryPublicId: z.string().min(1).optional(),
    cloudinaryUrl: z.string().url().optional(),
    kind: z.enum(mediaKindEnum.enumValues).optional(),
    filename: z.string().min(1).optional(),
    mimeType: z.string().nullable().optional(),
    size: z.number().int().min(0).optional(),
    width: z.number().int().min(0).optional(),
    height: z.number().int().min(0).optional(),
    duration: z.number().int().min(0).optional(),
    caption: z.string().nullable().optional(),
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
        .from(mediaAssetsSchema)
        .where(and(eq(mediaAssetsSchema.id, parsedId.data.id), eq(mediaAssetsSchema.orgId, orgId), isNull(mediaAssetsSchema.deletedAt)));
      if (rows.length === 0) {
        return notFound('Media asset not found');
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
      'ENGINEER',
    ]);

    const payload = parsed.data;
    return await runWithOrgContext({ orgId, userId: user.id, role: membership.role }, async () => {
      const [row] = await db
        .update(mediaAssetsSchema)
        .set({
          dailyLogId: payload.dailyLogId,
          cloudinaryPublicId: payload.cloudinaryPublicId,
          cloudinaryUrl: payload.cloudinaryUrl,
          kind: payload.kind as any,
          filename: payload.filename,
          mimeType: payload.mimeType,
          size: payload.size,
          width: payload.width,
          height: payload.height,
          duration: payload.duration,
          caption: payload.caption,
        })
        .where(and(eq(mediaAssetsSchema.id, parsedId.data.id), eq(mediaAssetsSchema.orgId, orgId), isNull(mediaAssetsSchema.deletedAt)))
        .returning();

      if (!row) {
        return notFound('Media asset not found');
      }
      return new Response(JSON.stringify({ ok: true, item: row }), {
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to update media asset', status: 500, detail: e?.message });
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
        .update(mediaAssetsSchema)
        .set({ deletedAt: new Date() })
        .where(and(eq(mediaAssetsSchema.id, parsedId.data.id), eq(mediaAssetsSchema.orgId, orgId), isNull(mediaAssetsSchema.deletedAt)))
        .returning();
      if (!row) {
        return notFound('Media asset not found');
      }
      return new Response(JSON.stringify({ ok: true }), {
        status: 204,
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to delete media asset', status: 500, detail: e?.message });
  }
}
