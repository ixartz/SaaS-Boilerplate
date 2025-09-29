import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import type { NextRequest } from 'next/server';

import { db } from '@/libs/DB';
import { membershipsSchema, organizationSchema, usersSchema } from '@/models/Schema';

import { hasRole } from './db-context';

export type AuthResult = {
  user: {
    id: string;
    clerkUserId: string;
    email: string;
    displayName: string | null;
  };
  membership: {
    id: string;
    role: string;
    isActive: boolean;
  };
  orgId: string;
  org: {
    id: string;
    name: string;
    slug: string;
  };
};

/**
 * Require user to have membership in organization with specific roles
 */
export async function requireMembership(
  req: NextRequest,
  allowedRoles: string[],
  orgId?: string,
): Promise<AuthResult> {
  // Get Clerk user
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    throw new Error('Unauthorized: No Clerk user ID');
  }

  // Get user from database
  const user = await db
    .select()
    .from(usersSchema)
    .where(eq(usersSchema.clerkUserId, clerkUserId))
    .limit(1);

  if (user.length === 0) {
    throw new Error('User not found in database');
  }

  const userData = user[0];
  if (!userData) {
    throw new Error('User data is undefined');
  }

  // Get organization ID from query params or use provided orgId
  const searchParams = req.nextUrl.searchParams;
  const targetOrgId = orgId || searchParams.get('orgId') || searchParams.get('org_id');

  if (!targetOrgId) {
    throw new Error('Organization ID required');
  }

  // Get membership
  const membership = await db
    .select({
      id: membershipsSchema.id,
      role: membershipsSchema.role,
      isActive: membershipsSchema.isActive,
      orgId: membershipsSchema.orgId,
    })
    .from(membershipsSchema)
    .where(
      and(
        eq(membershipsSchema.userId, userData.id),
        eq(membershipsSchema.orgId, targetOrgId),
        eq(membershipsSchema.isActive, true),
      ),
    )
    .limit(1);

  if (membership.length === 0) {
    throw new Error('No active membership found for this organization');
  }

  const membershipData = membership[0];
  if (!membershipData) {
    throw new Error('Membership data is undefined');
  }

  // Check role permissions
  if (!hasRole(membershipData.role, allowedRoles)) {
    throw new Error(`Insufficient permissions. Required: ${allowedRoles.join(', ')}. Current: ${membershipData.role}`);
  }

  // Get organization details
  const org = await db
    .select()
    .from(organizationSchema)
    .where(eq(organizationSchema.id, targetOrgId))
    .limit(1);

  if (org.length === 0) {
    throw new Error('Organization not found');
  }

  const orgData = org[0];
  if (!orgData) {
    throw new Error('Organization data is undefined');
  }

  return {
    user: {
      id: userData.id,
      clerkUserId: userData.clerkUserId,
      email: userData.email,
      displayName: userData.displayName,
    },
    membership: {
      id: membershipData.id,
      role: membershipData.role,
      isActive: membershipData.isActive,
    },
    orgId: targetOrgId,
    org: {
      id: orgData.id,
      name: orgData.name,
      slug: orgData.slug,
    },
  };
}

/**
 * Get user's memberships across all organizations
 */
export async function getUserMemberships(clerkUserId: string) {
  const memberships = await db
    .select({
      id: membershipsSchema.id,
      role: membershipsSchema.role,
      isActive: membershipsSchema.isActive,
      orgId: membershipsSchema.orgId,
      orgName: organizationSchema.name,
      orgSlug: organizationSchema.slug,
    })
    .from(membershipsSchema)
    .innerJoin(organizationSchema, eq(membershipsSchema.orgId, organizationSchema.id))
    .innerJoin(usersSchema, eq(membershipsSchema.userId, usersSchema.id))
    .where(
      and(
        eq(usersSchema.clerkUserId, clerkUserId),
        eq(membershipsSchema.isActive, true),
      ),
    );

  return memberships;
}

/**
 * Check if user can perform action based on role
 */
export function canPerformAction(userRole: string, action: string): boolean {
  const permissions = {
    // Project management
    'projects.create': ['OWNER', 'ADMIN', 'PM'],
    'projects.update': ['OWNER', 'ADMIN', 'PM'],
    'projects.delete': ['OWNER', 'ADMIN'],
    'projects.view': ['OWNER', 'ADMIN', 'PM', 'ENGINEER', 'ACCOUNTANT', 'VIEWER'],

    // Task management
    'tasks.create': ['OWNER', 'ADMIN', 'PM', 'ENGINEER'],
    'tasks.update': ['OWNER', 'ADMIN', 'PM', 'ENGINEER'],
    'tasks.delete': ['OWNER', 'ADMIN', 'PM'],
    'tasks.view': ['OWNER', 'ADMIN', 'PM', 'ENGINEER', 'ACCOUNTANT', 'VIEWER'],

    // Daily logs
    'daily_logs.create': ['OWNER', 'ADMIN', 'PM', 'ENGINEER'],
    'daily_logs.update': ['OWNER', 'ADMIN', 'PM', 'ENGINEER'],
    'daily_logs.delete': ['OWNER', 'ADMIN', 'PM'],
    'daily_logs.view': ['OWNER', 'ADMIN', 'PM', 'ENGINEER', 'ACCOUNTANT', 'VIEWER'],

    // Financial
    'transactions.create': ['OWNER', 'ADMIN', 'ACCOUNTANT'],
    'transactions.update': ['OWNER', 'ADMIN', 'ACCOUNTANT'],
    'transactions.delete': ['OWNER', 'ADMIN'],
    'transactions.view': ['OWNER', 'ADMIN', 'PM', 'ACCOUNTANT'],

    // Media
    'media.create': ['OWNER', 'ADMIN', 'PM', 'ENGINEER'],
    'media.delete': ['OWNER', 'ADMIN', 'PM'],
    'media.view': ['OWNER', 'ADMIN', 'PM', 'ENGINEER', 'ACCOUNTANT', 'VIEWER'],

    // Share links
    'share_links.create': ['OWNER', 'ADMIN', 'PM'],
    'share_links.update': ['OWNER', 'ADMIN', 'PM'],
    'share_links.delete': ['OWNER', 'ADMIN', 'PM'],
    'share_links.view': ['OWNER', 'ADMIN', 'PM', 'ENGINEER', 'ACCOUNTANT', 'VIEWER'],
  };

  const allowedRoles = permissions[action as keyof typeof permissions];
  if (!allowedRoles) {
    return false;
  }

  return hasRole(userRole, allowedRoles);
}
