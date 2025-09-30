import { NextResponse } from 'next/server';

const COOKIE_NAME = 'e2e-auth-bypass';

export function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: COOKIE_NAME,
    value: '',
    path: '/',
    httpOnly: false,
    maxAge: 0,
  });
  return response;
}
