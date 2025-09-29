import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const role = searchParams.get('role');
    const orgId = searchParams.get('orgId');

    return NextResponse.json({
      ok: true,
      message: 'RBAC test endpoint working!',
      role: role || 'not provided',
      orgId: orgId || 'not provided',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Test failed',
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
