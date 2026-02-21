import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';

import { badgeVariants } from '@/components/ui/badgeVariants';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredHero } from '@/features/landing/CenteredHero';
import { Section } from '@/features/landing/Section';

export const Hero = () => {
  return (
    <Section className="py-36">
      <CenteredHero
        banner={(
          <a
            className={badgeVariants()}
            href="https://twitter.com/ixartz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterLogoIcon className="mr-1 size-5" />
            {' '}
            Follow on Twitter
          </a>
        )}
        title={(
          <>
            The perfect tool for your{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              AI Video Generation
            </span>
          </>
        )}
        description="Create stunning videos with AI in minutes. No video editing skills required."
        buttons={(
          <>
            <a
              className={buttonVariants({ size: 'lg' })}
              href="/sign-up"
            >
              Get Started
            </a>

            <a
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
              href="https://github.com/ixartz/SaaS-Boilerplate"
            >
              <GitHubLogoIcon className="mr-2 size-5" />
              GitHub
            </a>
          </>
        )}
      />
    </Section>
  );
};
