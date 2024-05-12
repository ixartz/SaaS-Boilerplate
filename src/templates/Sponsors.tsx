import Image from 'next/image';

import { LogoCloud } from '@/features/landing/LogoCloud';
import { Section } from '@/features/landing/Section';

const Sponsors = () => (
  <Section>
    <LogoCloud text="Sponsored by">
      <a
        href="https://clerk.com?utm_source=github&utm_medium=sponsorship&utm_campaign=nextjs-boilerplate"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/assets/images/clerk.png"
          alt="Clerk"
          width="128"
          height="40"
        />
      </a>

      <a
        href="https://turso.tech/?utm_source=nextjsstarterbp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/assets/images/turso-dark.png"
          alt="Turso"
          width="128"
          height="29"
        />
      </a>

      <a
        href="https://l.crowdin.com/next-js"
        target="_blank"
        rel="noopener noreferrer"
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
        rel="noopener noreferrer"
      >
        <Image
          src="/assets/images/sentry-dark.png"
          alt="Sentry"
          width="128"
          height="38"
        />
      </a>

      <a href="https://nextlessjs.com" target="_blank" rel="noopener">
        <Image
          src="/assets/images/nextlessjs.png"
          alt="Nextjs SaaS Boilerplate"
          width="128"
          height="30"
        />
      </a>
    </LogoCloud>
  </Section>
);

export { Sponsors };
