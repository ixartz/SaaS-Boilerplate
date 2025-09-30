// API to get users from our users table
import type { NextRequest } from 'next/server';

import { requireMembership } from '@/lib/auth';
import { serverError } from '@/libs/api/errors';
import { db } from '@/libs/DB';
import { usersSchema } from '@/models/Schema';

export async function GET(req: NextRequest) {
  try {
    // Check for E2E bypass header first
    const isE2EBypass = req.headers.get('x-e2e-bypass') === 'true';

    if (isE2EBypass) {
      console.log('🔄 E2E mode: Fetching users from database...');

      // Get all users from our database
      const users = await db.query.usersSchema.findMany({
        orderBy: (users, { desc }) => [desc(users.createdAt)],
      });

      console.log('👥 Found users in database:', users.length);

      return new Response(JSON.stringify({ ok: true, items: users }), {
        headers: { 'content-type': 'application/json' },
      });
    }

    // Regular Clerk authentication
    const { orgId } = await requireMembership(req, [
      'OWNER',
      'ADMIN',
      'PM',
      'ENGINEER',
      'ACCOUNTANT',
      'VIEWER',
    ]);

    console.log('🔄 Fetching users from Clerk organization:', orgId);

    // For real Clerk, get organization members and sync to our database
    try {
      const { clerkClient } = await import('@clerk/nextjs/server');
      const organizationMembers = await clerkClient.organizations.getOrganizationMembershipList({
        organizationId: orgId,
      });

      const clerkUsers = organizationMembers.data.map(member => ({
        clerkUserId: member.userId,
        email: member.publicUserData?.emailAddress || '',
        name: member.publicUserData?.firstName && member.publicUserData?.lastName
          ? `${member.publicUserData.firstName} ${member.publicUserData.lastName}`
          : member.publicUserData?.emailAddress || 'Unknown User',
        avatarUrl: member.publicUserData?.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.publicUserData?.emailAddress || 'User')}&background=random`,
      }));

      // Sync users to our database
      for (const clerkUser of clerkUsers) {
        await db
          .insert(usersSchema)
          .values({
            clerkUserId: clerkUser.clerkUserId,
            email: clerkUser.email,
            name: clerkUser.name,
            avatarUrl: clerkUser.avatarUrl,
          })
          .onConflictDoUpdate({
            target: usersSchema.clerkUserId,
            set: {
              email: clerkUser.email,
              name: clerkUser.name,
              avatarUrl: clerkUser.avatarUrl,
              updatedAt: new Date(),
            },
          });
      }

      // Get all users from our database (now synced)
      const users = await db.query.usersSchema.findMany({
        orderBy: (users, { desc }) => [desc(users.createdAt)],
      });

      console.log('👥 Found users in database:', users.length);

      return new Response(JSON.stringify({ ok: true, items: users }), {
        headers: { 'content-type': 'application/json' },
      });
    } catch (clerkError) {
      console.error('Clerk API error:', clerkError);
      // Fallback to database users
      const users = await db.query.usersSchema.findMany({
        orderBy: (users, { desc }) => [desc(users.createdAt)],
      });

      return new Response(JSON.stringify({ ok: true, items: users }), {
        headers: { 'content-type': 'application/json' },
      });
    }
  } catch (e: any) {
    console.error('💥 Error fetching users:', e);
    return serverError(e?.message);
  }
}
