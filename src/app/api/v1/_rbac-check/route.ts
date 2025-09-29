import { NextRequest, NextResponse } from 'next/server';

import { requireMembership } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    // Get role from query parameter
    const searchParams = req.nextUrl.searchParams;
    const requiredRole = searchParams.get('role');

    if (!requiredRole) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Role parameter is required',
          example: '/api/v1/_rbac-check?role=OWNER&orgId=your-org-id',
        },
        { status: 400 },
      );
    }

    // Define valid roles
    const validRoles = ['OWNER', 'ADMIN', 'PM', 'ENGINEER', 'ACCOUNTANT', 'VIEWER'];

    if (!validRoles.includes(requiredRole)) {
      return NextResponse.json(
        {
          ok: false,
          error: `Invalid role. Must be one of: ${validRoles.join(', ')}`,
        },
        { status: 400 },
      );
    }

    // Check membership with required role
    const authResult = await requireMembership(req, [requiredRole]);

    return NextResponse.json({
      ok: true,
      role: authResult.membership.role,
      user: {
        id: authResult.user.id,
        email: authResult.user.email,
        displayName: authResult.user.displayName,
      },
      organization: {
        id: authResult.orgId,
        name: authResult.org.name,
        slug: authResult.org.slug,
      },
      membership: {
        id: authResult.membership.id,
        isActive: authResult.membership.isActive,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('RBAC check failed:', error);

    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
        timestamp: new Date().toISOString(),
      },
      { status: 403 },
    );
  }
}

// Test endpoint for different roles
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { role, orgId } = body;

    if (!role || !orgId) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Both role and orgId are required',
        },
        { status: 400 },
      );
    }

    // Create a new request with orgId in query params
    const testReq = new NextRequest(
      `${req.nextUrl.origin}/api/v1/_rbac-check?role=${role}&orgId=${orgId}`,
      { method: 'GET' },
    );

    return await GET(testReq);
  } catch (error) {
    console.error('RBAC test failed:', error);

    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Test failed',
      },
      { status: 500 },
    );
  }
}
