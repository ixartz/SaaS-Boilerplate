import { createHash } from 'node:crypto';

import { NextResponse } from 'next/server';
import { z } from 'zod';

import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import { leadSchema } from '@/models/Schema';

const leadInput = z.object({
  email: z.string().email().max(320),
  company: z.string().max(200).optional().nullable(),
  role: z.string().max(100).optional().nullable(),
  useCase: z.string().max(2000).optional().nullable(),
  source: z.string().max(100),
  utm: z.record(z.string()).optional().nullable(),
});

function hashIp(ip: string): string {
  return createHash('sha256')
    .update(`${ip}|${process.env.CLERK_SECRET_KEY ?? 'strix-demo'}`)
    .digest('hex')
    .slice(0, 24);
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = leadInput.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid lead payload.', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const input = parsed.data;
  const forwarded = req.headers.get('x-forwarded-for') ?? '';
  const ip = forwarded.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') ?? null;
  const referrer = req.headers.get('referer') ?? null;

  try {
    await db.insert(leadSchema).values({
      email: input.email.toLowerCase().trim(),
      company: input.company ?? null,
      role: input.role ?? null,
      useCase: input.useCase ?? null,
      source: input.source,
      referrer,
      utm: input.utm ? JSON.stringify(input.utm) : null,
      userAgent,
      ipHash: hashIp(ip),
    });

    logger.info(
      { source: input.source, hasCompany: Boolean(input.company) },
      'lead.captured',
    );

    const webhook = process.env.LEAD_WEBHOOK_URL;
    if (webhook) {
      // Fire-and-forget notify: don't block the user on Slack latency.
      fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          text: `New Strix lead · ${input.source} · ${input.email}${input.company ? ` (${input.company})` : ''}`,
          email: input.email,
          company: input.company ?? null,
          role: input.role ?? null,
          useCase: input.useCase ?? null,
          source: input.source,
        }),
      }).catch((err) => {
        logger.warn({ err }, 'lead.webhook_failed');
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    logger.error({ err }, 'lead.persist_failed');
    return NextResponse.json(
      { error: 'Could not save lead. Please try again.' },
      { status: 500 },
    );
  }
}
