import Link from 'next/link';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredMenu } from '@/features/landing/CenteredMenu';
import { Section } from '@/features/landing/Section';

import { Logo } from './Logo';

export const Navbar = () => {
  return (
    <Section className="px-3 py-6">
      <CenteredMenu
        logo={<Logo />}
        rightMenu={(
          <>
            <li className="ml-1 mr-2.5" data-fade>
              <Link href="/sign-in">Sign in</Link>
            </li>
            <li>
              <Link className={buttonVariants()} href="/sign-up">
                Sign up
              </Link>
            </li>
          </>
        )}
      >
        <li>
          <Link href="/sign-up">Product</Link>
        </li>

        <li>
          <Link href="/sign-up">Docs</Link>
        </li>

        <li>
          <Link href="/sign-up">Blog</Link>
        </li>

        <li>
          <Link href="/sign-up">Community</Link>
        </li>

        <li>
          <Link href="/sign-up">Company</Link>
        </li>
      </CenteredMenu>
    </Section>
  );
};
