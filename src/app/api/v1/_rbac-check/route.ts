import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { requireMembership } from '@/lib/auth';
import { runWithOrgContext } from '@/lib/db-context';
import { badRequest, forbidden, problemJson } from '@/libs/api/errors';

const querySchema = z.object({
  role: z.enum(['OWNER', 'ADMIN', 'PM', 'ENGINEER', 'ACCOUNTANT', 'VIEWER']),
  orgId: z.string().min(1),
});

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams.entries());
  const parsed = querySchema.safeParse(params);
  if (!parsed.success) {
    return problemJson({
      title: 'Validation failed',
      status: 422,
      detail: 'Invalid query parameters',
      extensions: { issues: parsed.error.issues },
    });
  }

  try {
    const { role, orgId } = parsed.data;
    const { user, membership, org } = await requireMembership(req, [role], orgId);

    const contextResult = await runWithOrgContext(
      { orgId: org.id, userId: user.id, role: membership.role },
      async () => ({ ok: true }),
    );

    return new Response(
      JSON.stringify({
        ok: true,
        role: membership.role,
        user: { id: user.id, email: user.email },
        org: { id: org.id, name: org.name },
        contextResult,
        timestamp: new Date().toISOString(),
      }),
      { headers: { 'content-type': 'application/json' } },
    );
  } catch (e: any) {
    const msg = typeof e?.message === 'string' ? e.message : 'Forbidden';
    if (msg.toLowerCase().includes('unauthorized')) {
      return forbidden(msg);
    }
    return badRequest(msg);
  }
}
