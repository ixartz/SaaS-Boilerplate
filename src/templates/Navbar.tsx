import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredMenu } from '@/features/landing/CenteredMenu';
import { Section } from '@/features/landing/Section';
import { Link } from '@/libs/I18nNavigation';
import { Logo } from './Logo';

export const Navbar = () => {
  const t = useTranslations('Navbar');

  return (
    <Section className="px-3 py-6">
      <CenteredMenu
        logo={<Logo />}
        rightMenu={(
          <>
            <li>
              <LocaleSwitcher />
            </li>
            <li className="mr-2.5 ml-1">
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
          <Link href="/sign-up">{t('product')}</Link>
        </li>

        <li>
          <Link href="/sign-up">{t('pricing')}</Link>
        </li>

        <li>
          <Link href="/sign-up">{t('docs')}</Link>
        </li>

        <li>
          <Link href="/sign-up">{t('blog')}</Link>
        </li>

        <li>
          <Link href="/sign-up">{t('about')}</Link>
        </li>
      </CenteredMenu>
    </Section>
  );
};
