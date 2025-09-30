// API to get organization members from Clerk
import { clerkClient } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Get organization ID from headers or query params
    const orgId = req.headers.get('x-org-id') || req.nextUrl.searchParams.get('orgId') || 'org_e2e_default';

    console.log('🔍 Fetching members for org:', orgId);

    // For E2E testing, return mock data
    if (orgId === 'org_e2e_default') {
      return new Response(JSON.stringify({
        ok: true,
        members: [
          {
            id: '00000000-0000-0000-0000-000000000001',
            clerkUserId: 'clerk_e2e_owner',
            email: 'e2e@test.com',
            firstName: 'E2E',
            lastName: 'Test User',
            displayName: 'E2E Test User',
            role: 'admin',
            imageUrl: 'https://ui-avatars.com/api/?name=E2E+Test+User&background=random',
            createdAt: '2024-01-01T00:00:00Z',
            isCurrentUser: true,
          },
        ],
        totalCount: 1,
      }), {
        headers: { 'content-type': 'application/json' },
      });
    }

    // For real Clerk, get organization members
    try {
      const organizationMembers = await clerkClient.organizations.getOrganizationMembershipList({
        organizationId: orgId,
        limit: 100, // Adjust as needed
      });

      // Get current user info for comparison
      const currentUserId = req.headers.get('x-user-id');

      const members = organizationMembers.data.map(member => ({
        id: member.publicUserData?.userId || member.userId,
        clerkUserId: member.userId,
        email: member.publicUserData?.emailAddress || '',
        firstName: member.publicUserData?.firstName || '',
        lastName: member.publicUserData?.lastName || '',
        displayName: member.publicUserData?.firstName && member.publicUserData?.lastName
          ? `${member.publicUserData.firstName} ${member.publicUserData.lastName}`
          : member.publicUserData?.emailAddress || 'Unknown User',
        role: member.role,
        imageUrl: member.publicUserData?.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.publicUserData?.firstName || 'User')}&background=random`,
        createdAt: member.createdAt,
        isCurrentUser: member.userId === currentUserId,
      }));

      return new Response(JSON.stringify({
        ok: true,
        members,
        totalCount: organizationMembers.totalCount,
      }), {
        headers: { 'content-type': 'application/json' },
      });
    } catch (clerkError) {
      console.error('Clerk API error:', clerkError);
      return new Response(JSON.stringify({
        ok: false,
        error: 'Failed to fetch members from Clerk',
        details: clerkError.message,
      }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      });
    }
  } catch (e: any) {
    console.error('Error in clerk-members API:', e);
    return new Response(JSON.stringify({
      ok: false,
      error: e?.message || 'Failed to fetch members',
    }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
