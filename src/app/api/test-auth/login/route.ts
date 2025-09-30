import { NextResponse } from 'next/server';

const COOKIE_NAME = 'e2e-auth-bypass';

export function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: COOKIE_NAME,
    value: '1',
    path: '/',
    httpOnly: false,
    maxAge: 60 * 60,
  });
  return response;
}
