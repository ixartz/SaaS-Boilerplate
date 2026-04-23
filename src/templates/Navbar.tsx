import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredMenu } from '@/features/landing/CenteredMenu';
import { Section } from '@/features/landing/Section';
import { AppConfig } from '@/utils/AppConfig';

import { Logo } from './Logo';

export const Navbar = () => {
  const t = useTranslations('Navbar');

  return (
    <Section className="px-3 py-6">
      <CenteredMenu
        logo={<Logo />}
        rightMenu={(
          <>
            <li data-fade>
              <LocaleSwitcher />
            </li>
            <li className="ml-1 mr-2.5" data-fade>
              <Link href="/sign-in">{t('sign_in')}</Link>
            </li>
            <li>
              <Link className={buttonVariants()} href="/sign-up">
                {t('sign_up')}
              </Link>
            </li>
          </>
        )}
      >
        <li>
          <Link href="/#features">{t('product')}</Link>
        </li>

        <li>
          <a href={AppConfig.docsUrl} target="_blank" rel="noopener noreferrer">{t('docs')}</a>
        </li>

        <li>
          <Link href="/strix-store">{t('community')}</Link>
        </li>

        <li>
          <a
            className="inline-flex items-center gap-1"
            href={AppConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubLogoIcon className="size-4" />
            {t('company')}
          </a>
        </li>
      </CenteredMenu>
    </Section>
  );
};
