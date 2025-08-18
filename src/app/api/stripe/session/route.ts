import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-06-20',
  });

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  });

  return NextResponse.json({ id: session.id });
}
