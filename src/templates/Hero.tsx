import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredHero } from '@/features/landing/CenteredHero';
import { Section } from '@/features/landing/Section';
import { LeadForm } from '@/features/leads/LeadForm';
import { AppConfig } from '@/utils/AppConfig';

export const Hero = () => {
  const t = useTranslations('Hero');

  return (
    <Section className="py-28 sm:py-36">
      <CenteredHero
        banner={(
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-300">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-emerald-500" />
            {t('follow_twitter')}
          </span>
        )}
        title={t.rich('title', {
          important: chunks => (
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              {chunks}
            </span>
          ),
        })}
        description={t('description')}
        buttons={(
          <>
            <Link
              className={buttonVariants({ size: 'lg' })}
              href="/strix-store"
            >
              {t('primary_button')}
            </Link>

            <a
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
              href={AppConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubLogoIcon className="mr-2 size-5" />
              {t('secondary_button')}
            </a>
          </>
        )}
      />

      <div className="mx-auto mt-10 max-w-xl">
        <LeadForm
          source="landing_hero"
          variant="light"
          buttonLabel="Request access"
          headline="Skip the waitlist."
          subhead="Drop your work email and we'll send you a private walkthrough on your stack."
        />
      </div>
    </Section>
  );
};
