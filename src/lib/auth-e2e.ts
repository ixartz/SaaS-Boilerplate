// E2E Authentication Mock for Testing
import type { NextRequest } from 'next/server';

export type E2EAuthContext = {
  orgId: string;
  userId: string;
  membership: {
    role: string;
  };
};

export function getE2EAuthContext(req: NextRequest): E2EAuthContext | null {
  // Check for E2E bypass cookie
  const bypassAuth = req.cookies.get('e2e-auth-bypass')?.value === '1';

  if (!bypassAuth) {
    return null;
  }

  // Return mock auth context for E2E testing
  return {
    orgId: 'org_e2e_default',
    userId: '00000000-0000-0000-0000-000000000001',
    membership: {
      role: 'OWNER',
    },
  };
}

export function requireE2EMembership(req: NextRequest, allowedRoles?: string[]): E2EAuthContext {
  const authContext = getE2EAuthContext(req);

  if (!authContext) {
    throw new Error('E2E authentication required');
  }

  if (allowedRoles && !allowedRoles.includes(authContext.membership.role)) {
    throw new Error('Insufficient permissions for E2E testing');
  }

  return authContext;
}
