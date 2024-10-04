/* eslint-disable react-dom/no-unsafe-target-blank */
import Image from 'next/image';

import { LogoCloud } from '@/features/landing/LogoCloud';
import { Section } from '@/features/landing/Section';

export const Sponsors = () => (
  <Section>
    <LogoCloud text="Sponsored by">
      <a
        href="https://clerk.com?utm_source=github&utm_medium=sponsorship&utm_campaign=nextjs-boilerplate"
        target="_blank"
        rel="noopener"
      >
        <Image
          src="/assets/images/clerk-logo-dark.png"
          alt="Clerk"
          width="128"
          height="37"
        />
      </a>

      <a
        href="https://l.crowdin.com/next-js"
        target="_blank"
        rel="noopener"
      >
        <Image
          src="/assets/images/crowdin-dark.png"
          alt="Crowdin"
          width="128"
          height="26"
        />
      </a>

      <a
        href="https://sentry.io/for/nextjs/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy25q1-nextjs&utm_content=github-banner-nextjsboilerplate-logo"
        target="_blank"
        rel="noopener"
      >
        <Image
          src="/assets/images/sentry-dark.png"
          alt="Sentry"
          width="128"
          height="38"
        />
      </a>

      <a href="https://nextjs-boilerplate.com/pro-saas-starter-kit">
        <Image
          src="/assets/images/nextjs-boilerplate-saas.png"
          alt="Nextjs SaaS Boilerplate"
          width="128"
          height="30"
        />
      </a>
    </LogoCloud>
  </Section>
);
