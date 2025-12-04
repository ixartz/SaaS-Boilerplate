import { NextResponse } from 'next/server';

import { db } from '@/libs/DB';
import { accessRequestSchema } from '@/models/Schema';
import { AccessRequestValidation } from '@/validations/AccessRequestValidation';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parse = AccessRequestValidation.safeParse(json);

    if (!parse.success) {
      return NextResponse.json(parse.error.format(), { status: 422 });
    }

    const { email, name } = parse.data;

    await db.insert(accessRequestSchema).values({
      email,
      name,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    // Handle unique constraint violation
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'Email already requested access' },
        { status: 409 },
      );
    }
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
