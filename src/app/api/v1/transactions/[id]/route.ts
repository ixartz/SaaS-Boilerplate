import { and, eq, isNull } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { requireMembership } from '@/lib/auth';
import { runWithOrgContext } from '@/lib/db-context';
import { badRequest, notFound, problemJson, serverError } from '@/libs/api/errors';
import { parseJson } from '@/libs/api/validate';
import { db } from '@/libs/DB';
import { transactionsSchema, transactionTypeEnum } from '@/models/Schema';

const idSchema = z.object({ id: z.string().uuid() });

const updateSchema = z
  .object({
    projectId: z.string().uuid().optional(),
    type: z.enum(transactionTypeEnum.enumValues).optional(),
    amount: z.string().optional(),
    description: z.string().optional(),
    category: z.string().nullable().optional(),
    vendor: z.string().nullable().optional(),
    reference: z.string().nullable().optional(),
    transactionDate: z.string().datetime().optional(),
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
      'ACCOUNTANT',
      'VIEWER',
    ]);

    return await runWithOrgContext({ orgId, userId: user.id, role: membership.role }, async () => {
      const rows = await db
        .select()
        .from(transactionsSchema)
        .where(and(eq(transactionsSchema.id, parsedId.data.id), eq(transactionsSchema.orgId, orgId), isNull(transactionsSchema.deletedAt)));
      if (rows.length === 0) {
        return notFound('Transaction not found');
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
      'ACCOUNTANT',
    ]);

    const payload = parsed.data;
    return await runWithOrgContext({ orgId, userId: user.id, role: membership.role }, async () => {
      const [row] = await db
        .update(transactionsSchema)
        .set({
          projectId: payload.projectId,
          type: payload.type as any,
          amount: payload.amount as any,
          description: payload.description,
          category: payload.category,
          vendor: payload.vendor,
          reference: payload.reference,
          transactionDate: payload.transactionDate ? new Date(payload.transactionDate) : undefined,
        })
        .where(and(eq(transactionsSchema.id, parsedId.data.id), eq(transactionsSchema.orgId, orgId), isNull(transactionsSchema.deletedAt)))
        .returning();

      if (!row) {
        return notFound('Transaction not found');
      }
      return new Response(JSON.stringify({ ok: true, item: row }), {
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to update transaction', status: 500, detail: e?.message });
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
        .update(transactionsSchema)
        .set({ deletedAt: new Date() })
        .where(and(eq(transactionsSchema.id, parsedId.data.id), eq(transactionsSchema.orgId, orgId), isNull(transactionsSchema.deletedAt)))
        .returning();
      if (!row) {
        return notFound('Transaction not found');
      }
      return new Response(JSON.stringify({ ok: true }), {
        status: 204,
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to delete transaction', status: 500, detail: e?.message });
  }
}
