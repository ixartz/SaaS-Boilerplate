// Test users API without middleware
import type { NextRequest } from 'next/server';

import { db } from '@/libs/DB';

export async function GET(req: NextRequest) {
  try {
    console.log('🔄 Test GET users...');

    // Get all users from our database (no auth required)
    const users = await db.query.usersSchema.findMany({
      orderBy: (users, { desc }) => [desc(users.createdAt)],
    });

    console.log('👥 Found users in database:', users.length);

    return new Response(JSON.stringify({ ok: true, items: users }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (e: any) {
    console.error('💥 Error fetching users:', e);
    return new Response(
      JSON.stringify({ ok: false, error: e?.message }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    );
  }
}
