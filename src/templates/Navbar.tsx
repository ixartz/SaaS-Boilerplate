import Link from 'next/link';
import { useTranslations } from 'next-intl';

import LocaleSwitcher from '@/components/LocaleSwitcher';
import { Button } from '@/components/ui/button';
import { CenteredMenu } from '@/features/landing/CenteredMenu';
import { Section } from '@/features/landing/Section';

import { Logo } from './Logo';

const Navbar = () => {
  const t = useTranslations('Navbar');

  return (
    <Section className="px-3 py-6">
      <CenteredMenu
        logo={<Logo />}
        rightMenu={
          <>
            <li>
              <LocaleSwitcher />
            </li>
            <li>
              <Button variant="link">
                <Link href="/sign-in">{t('sign_in')}</Link>
              </Button>
            </li>
            <li>
              <Link href="/sign-up">
                <Button>{t('sign_up')}</Button>
              </Link>
            </li>
          </>
        }
      />
    </Section>
  );
};

export { Navbar };
