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
