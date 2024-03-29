import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/button';
import { CenteredHero } from '@/features/landing/CenteredHero';
import { Section } from '@/features/landing/Section';

const Hero = () => {
  const t = useTranslations('Hero');

  return (
    <Section className="py-48 pb-72">
      <CenteredHero
        banner={{
          href: 'https://twitter.com/ixartz',
          text: (
            <>
              <TwitterLogoIcon className="mr-1 size-5" /> {t('follow_twitter')}
            </>
          ),
        }}
        title={t.rich('title', {
          important: (chunks) => (
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {chunks}
            </span>
          ),
        })}
        description={t('description')}
        buttons={
          <>
            <Link className={buttonVariants({ size: 'lg' })} href="/">
              {t('primary_button')}
            </Link>

            <Link
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
              href="/"
            >
              <GitHubLogoIcon className="mr-2 size-5" />
              {t('secondary_button')}
            </Link>
          </>
        }
      />
    </Section>
  );
};

export { Hero };
