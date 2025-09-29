import { sql } from 'drizzle-orm';

import { db } from '@/libs/DB';

export type OrgContext = {
  orgId: string;
  userId: string;
  role: string;
};

/**
 * Run a database operation with organization context
 * Sets PostgreSQL session variables for RLS policies
 */
export async function runWithOrgContext<T>(
  context: OrgContext,
  operation: () => Promise<T>,
): Promise<T> {
  return await db.transaction(async (tx) => {
    // Set session variables for RLS
    await tx.execute(sql`SET LOCAL app.current_org = ${context.orgId}`);
    await tx.execute(sql`SET LOCAL app.current_user_id = ${context.userId}`);
    await tx.execute(sql`SET LOCAL app.current_user_role = ${context.role}`);

    // Run the operation within the transaction
    return await operation();
  });
}

/**
 * Get current organization context from session
 */
export async function getCurrentOrgContext(): Promise<OrgContext | null> {
  try {
    const result = await db.execute(sql`
      SELECT 
        current_setting('app.current_org') as org_id,
        current_setting('app.current_user_id') as user_id,
        current_setting('app.current_user_role') as role
    `);

    const context = result.rows[0] as any;

    if (!context.org_id || !context.user_id || !context.role) {
      return null;
    }

    return {
      orgId: context.org_id,
      userId: context.user_id,
      role: context.role,
    };
  } catch (error) {
    console.error('Error getting org context:', error);
    return null;
  }
}

/**
 * Check if user has required role in current organization
 */
export function hasRole(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole);
}

/**
 * Role hierarchy for permission checking
 */
export const ROLE_HIERARCHY = {
  OWNER: 6,
  ADMIN: 5,
  PM: 4,
  ENGINEER: 3,
  ACCOUNTANT: 2,
  VIEWER: 1,
} as const;

/**
 * Check if user role has sufficient permissions
 */
export function hasPermission(userRole: string, requiredRole: string): boolean {
  const userLevel = ROLE_HIERARCHY[userRole as keyof typeof ROLE_HIERARCHY] || 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole as keyof typeof ROLE_HIERARCHY] || 0;

  return userLevel >= requiredLevel;
}
