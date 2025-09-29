import { and, eq, isNull } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { requireMembership } from '@/lib/auth';
import { runWithOrgContext } from '@/lib/db-context';
import { badRequest, notFound, problemJson, serverError } from '@/libs/api/errors';
import { parseJson } from '@/libs/api/validate';
import { db } from '@/libs/DB';
import { dailyLogsSchema } from '@/models/Schema';

const idSchema = z.object({ id: z.string().uuid() });

const updateSchema = z
  .object({
    projectId: z.string().uuid().optional(),
    categoryId: z.string().uuid().optional(),
    logDate: z.string().datetime().optional(),
    weather: z.string().nullable().optional(),
    temperature: z.string().optional(),
    notes: z.string().nullable().optional(),
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
        .from(dailyLogsSchema)
        .where(and(eq(dailyLogsSchema.id, parsedId.data.id), eq(dailyLogsSchema.orgId, orgId), isNull(dailyLogsSchema.deletedAt)));
      if (rows.length === 0) {
        return notFound('Daily log not found');
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
        .update(dailyLogsSchema)
        .set({
          projectId: payload.projectId,
          categoryId: payload.categoryId,
          logDate: payload.logDate ? new Date(payload.logDate) : undefined,
          weather: payload.weather,
          temperature: payload.temperature as any,
          notes: payload.notes,
        })
        .where(and(eq(dailyLogsSchema.id, parsedId.data.id), eq(dailyLogsSchema.orgId, orgId), isNull(dailyLogsSchema.deletedAt)))
        .returning();

      if (!row) {
        return notFound('Daily log not found');
      }
      return new Response(JSON.stringify({ ok: true, item: row }), {
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to update daily log', status: 500, detail: e?.message });
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
        .update(dailyLogsSchema)
        .set({ deletedAt: new Date() })
        .where(and(eq(dailyLogsSchema.id, parsedId.data.id), eq(dailyLogsSchema.orgId, orgId), isNull(dailyLogsSchema.deletedAt)))
        .returning();
      if (!row) {
        return notFound('Daily log not found');
      }
      return new Response(JSON.stringify({ ok: true }), {
        status: 204,
        headers: { 'content-type': 'application/json' },
      });
    });
  } catch (e: any) {
    return problemJson({ title: 'Failed to delete daily log', status: 500, detail: e?.message });
  }
}
