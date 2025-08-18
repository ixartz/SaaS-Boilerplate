'use client';
import { useEffect } from 'react';

import { TitleBar } from '@/features/dashboard/TitleBar';

let stripe: any;

const BillingPage = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;
    script.onload = () => {
      stripe = (window as any).Stripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      );
    };
    document.body.appendChild(script);
  }, []);

  const checkout = async () => {
    const res = await fetch('/api/stripe/session', { method: 'POST' });
    const data = await res.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  const markPaid = () => {
    localStorage.setItem('paid', 'true');
  };

  return (
    <>
      <TitleBar
        title="Billing"
        description="Add your credit card to generate articles"
      />
      <button
        type="button"
        className="rounded bg-primary px-4 py-2 text-primary-foreground"
        onClick={checkout}
      >
        Subscribe - $10/mo
      </button>
      <button
        type="button"
        className="ml-2 rounded border px-4 py-2"
        onClick={markPaid}
      >
        Dev: Mark as Paid
      </button>
    </>
  );
};

export default BillingPage;
