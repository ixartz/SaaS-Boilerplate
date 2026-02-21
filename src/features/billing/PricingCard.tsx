import React from 'react';

import type { BillingInterval } from '@/types/Subscription';

export const PricingCard = (props: {
  planId: string;
  price: number;
  interval: BillingInterval;
  button: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="rounded-xl border border-border px-6 py-8 text-center">
      <div className="text-lg font-semibold">
        {props.planId.charAt(0).toUpperCase() + props.planId.slice(1)}
      </div>

      <div className="mt-3 flex items-center justify-center">
        <div className="text-5xl font-bold">
          {`$${props.price}`}
        </div>

        <div className="ml-1 text-muted-foreground">
          {`/ ${props.interval}`}
        </div>
      </div>

      <div className="mt-2 text-sm text-muted-foreground">
        {props.planId === 'free' && 'Perfect for trying out the platform'}
        {props.planId === 'premium' && 'For small teams and growing businesses'}
        {props.planId === 'enterprise' && 'For large organizations and enterprises'}
      </div>

      {props.button}

      <ul className="mt-8 space-y-3">{props.children}</ul>
    </div>
  );
};
