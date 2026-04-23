import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { CenteredFooter } from '@/features/landing/CenteredFooter';
import { Section } from '@/features/landing/Section';
import { AppConfig } from '@/utils/AppConfig';

import { Logo } from './Logo';

export const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <Section className="pb-16 pt-0">
      <CenteredFooter
        logo={<Logo />}
        name={AppConfig.name}
        iconList={(
          <>
            <li>
              <a href={AppConfig.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHubLogoIcon className="size-6" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/strixgov" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <TwitterLogoIcon className="size-6" />
              </a>
            </li>
          </>
        )}
        legalLinks={(
          <>
            <li>
              <Link href="/legal/terms">{t('terms_of_service')}</Link>
            </li>
            <li>
              <Link href="/legal/privacy">{t('privacy_policy')}</Link>
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
          <a href={AppConfig.githubUrl} target="_blank" rel="noopener noreferrer">{t('company')}</a>
        </li>
      </CenteredFooter>
    </Section>
  );
};
