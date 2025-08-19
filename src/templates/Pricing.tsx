import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { Section } from '@/features/landing/Section';

export const Pricing = () => {
  return (
    <Section
      subtitle="Pricing"
      title="Simple pricing"
      description="Start your 14 day free trial."
    >
      <div className="mx-auto max-w-sm rounded-xl border border-border p-8 text-center">
        <div className="text-lg font-semibold">Pro Plan</div>
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="text-muted-foreground line-through">$20</span>
          <span className="text-5xl font-bold">$10</span>
          <span className="text-muted-foreground">/ month</span>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          14 day free trial then $10 per month.
        </div>
        <ul className="mt-6 space-y-2 text-left">
          {[
            'Up to 30 AI-generated articles per month',
            'Up to 5 users per organization',
            'Reddit integration for trend-driven content',
            'SEO optimization',
            'Responsive customer support',
            '1-Click WordPress publishing',
          ].map(feature => (
            <li key={feature} className="flex items-start gap-2">
              <CheckCircle2 className="mt-1 h-5 w-5" aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/sign-up"
          className={buttonVariants({ size: 'sm', className: 'mt-5 w-full' })}
        >
          Start Free Trial
        </Link>
      </div>
    </Section>
  );
};
