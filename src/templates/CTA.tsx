import { GitHubLogoIcon } from '@radix-ui/react-icons';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { CTABanner } from '@/features/landing/CTABanner';
import { Section } from '@/features/landing/Section';

export const CTA = () => {
  return (
    <Section>
      <CTABanner
        title="Ready to get started?"
        description="Join thousands of satisfied users today."
        buttons={(
          <a
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
            href="https://github.com/ixartz/SaaS-Boilerplate"
          >
            <GitHubLogoIcon className="mr-2 size-5" />
            Get Started
          </a>
        )}
      />
    </Section>
  );
};
