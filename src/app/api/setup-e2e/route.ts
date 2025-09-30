// E2E Setup API - Create required data
import type { NextRequest } from 'next/server';

import { db } from '@/libs/DB';
import { membershipsSchema, organizationSchema, usersSchema } from '@/models/Schema';

export async function POST(req: NextRequest) {
  try {
    console.log('🔧 Setting up E2E data...');

    // Create E2E organization
    const [org] = await db
      .insert(organizationSchema)
      .values({
        id: 'org_e2e_default',
        name: 'E2E Test Organization',
        slug: 'e2e-test-org',
      })
      .onConflictDoNothing()
      .returning();

    console.log('✅ Organization:', org?.id || 'already exists');

    // Create E2E user with proper UUID
    const userId = '00000000-0000-0000-0000-000000000001';
    const [user] = await db
      .insert(usersSchema)
      .values({
        id: userId,
        clerkUserId: 'clerk_e2e_owner',
        email: 'e2e@test.com',
        displayName: 'E2E Test User',
      })
      .onConflictDoNothing()
      .returning();

    console.log('✅ User:', user?.id || 'already exists');

    // Create E2E membership
    const [membership] = await db
      .insert(membershipsSchema)
      .values({
        userId,
        orgId: 'org_e2e_default',
        role: 'OWNER',
        isActive: true,
      })
      .onConflictDoNothing()
      .returning();

    console.log('✅ Membership:', membership?.id || 'already exists');

    return new Response(JSON.stringify({
      ok: true,
      message: 'E2E data setup complete',
      data: {
        organization: org?.id || 'exists',
        user: user?.id || 'exists',
        membership: membership?.id || 'exists',
      },
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('❌ E2E setup error:', error);
    return new Response(JSON.stringify({
      type: 'about:blank',
      title: 'Setup Failed',
      status: 500,
      detail: error.message,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/problem+json' },
    });
  }
}
