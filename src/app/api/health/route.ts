import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      ok: true,
      version: '1.0.1',
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV || 'development',
      status: 'healthy',
      uptime: process.uptime(),
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: 'Health check failed',
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
