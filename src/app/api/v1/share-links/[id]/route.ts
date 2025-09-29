import { and, eq, isNull } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { requireMembership } from '@/lib/auth';
import { runWithOrgContext } from '@/lib/db-context';
import { badRequest, notFound, problemJson, serverError } from '@/libs/api/errors';
import { parseJson } from '@/libs/api/validate';
import { db } from '@/libs/DB';
import { shareLinksSchema } from '@/models/Schema';

const idSchema = z.object({ id: z.string().uuid() });

const updateSchema = z
  .object({
    projectId: z.string().uuid().optional(),
    name: z.string().min(1).optional(),
    description: z.string().nullable().optional(),
    hideFinancials: z.boolean().optional(),
    isActive: z.boolean().optional(),
    expiresAt: z.string().datetime().nullable().optional(),
    password: z.string().nullable().optional(),
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
        .from(shareLinksSchema)
        .where(and(eq(shareLinksSchema.id, parsedId.data.id), eq(shareLinksSchema.orgId, orgId), isNull(shareLinksSchema.deletedAt)));
      if (rows.length === 0) {
        return notFound('Share link not found');
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
        .update(shareLinksSchema)
        .set({
          projectId: payload.projectId,
          name: payload.name,
          description: payload.description,
          hideFinancials: payload.hideFinancials,
          isActive: payload.isActive,
          expiresAt: payload.expiresAt ? new Date(payload.expiresAt) : undefined,
          password: payload.password,
        })
        .where(and(eq(shareLinksSchema.id, parsedId.data.id), eq(shareLinksSchema.orgId, orgId), isNull(shareLinksSchema.deletedAt)))
        .returning();

      if (!row) {
        return notFound('Share link not found');
      }
      return new Response(JSON.stringify({ ok: true, item: row }), {
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to update share link', status: 500, detail: e?.message });
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
        .update(shareLinksSchema)
        .set({ deletedAt: new Date() })
        .where(and(eq(shareLinksSchema.id, parsedId.data.id), eq(shareLinksSchema.orgId, orgId), isNull(shareLinksSchema.deletedAt)))
        .returning();
      if (!row) {
        return notFound('Share link not found');
      }
      return new Response(JSON.stringify({ ok: true }), {
        status: 204,
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to delete share link', status: 500, detail: e?.message });
  }
}
