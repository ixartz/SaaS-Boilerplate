import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const role = searchParams.get('role');
    const orgId = searchParams.get('orgId');

    // Mock data for testing
    const mockUsers = {
      user_owner_123: { role: 'OWNER', email: 'owner@siteflow.com' },
      user_admin_123: { role: 'ADMIN', email: 'admin@siteflow.com' },
      user_pm_123: { role: 'PM', email: 'pm@siteflow.com' },
      user_engineer_123: { role: 'ENGINEER', email: 'engineer@siteflow.com' },
      user_accountant_123: { role: 'ACCOUNTANT', email: 'accountant@siteflow.com' },
      user_viewer_123: { role: 'VIEWER', email: 'viewer@siteflow.com' },
    };

    const testUserId = 'user_owner_123'; // Default to owner for testing
    const userData = mockUsers[testUserId as keyof typeof mockUsers];

    if (!userData) {
      return NextResponse.json(
        {
          ok: false,
          error: 'User not found in mock data',
        },
        { status: 404 },
      );
    }

    // Check if requested role matches user role
    const hasPermission = userData.role === role;

    return NextResponse.json({
      ok: true,
      message: 'Mock RBAC test successful',
      requestedRole: role,
      userRole: userData.role,
      hasPermission,
      user: {
        id: testUserId,
        email: userData.email,
        role: userData.role,
      },
      organization: {
        id: orgId || 'org_sample_123',
        name: 'SiteFlow Organization',
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Mock RBAC test failed',
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
