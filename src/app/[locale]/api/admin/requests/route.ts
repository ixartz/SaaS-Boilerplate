import { auth, clerkClient } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/libs/DB';
import { accessRequestSchema } from '@/models/Schema';

export async function GET() {
  const { orgRole } = await auth();

  if (orgRole !== 'org:admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const requests = await db.select().from(accessRequestSchema);
  return NextResponse.json(requests);
}

export async function POST(request: Request) {
  const { orgRole } = await auth();

  if (orgRole !== 'org:admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { id, action } = await request.json();

    if (action === 'approve') {
      const [req] = await db
        .select()
        .from(accessRequestSchema)
        .where(eq(accessRequestSchema.id, id));

      if (!req) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }

      const client = await clerkClient();
      await client.invitations.createInvitation({
        emailAddress: req.email,
        notify: true,
      });
      await db
        .update(accessRequestSchema)
        .set({ status: 'approved' })
        .where(eq(accessRequestSchema.id, id));
    } else if (action === 'reject') {
      await db
        .update(accessRequestSchema)
        .set({ status: 'rejected' })
        .where(eq(accessRequestSchema.id, id));
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);
    const errorMessage = error.errors?.[0]?.message || error.message || 'Internal Server Error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 },
    );
  }
}
