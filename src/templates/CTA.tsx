import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/button';
import { CTABanner } from '@/features/landing/CTABanner';
import { Section } from '@/features/landing/Section';

const CTA = () => {
  const t = useTranslations('CTA');

  return (
    <Section>
      <CTABanner
        title={t('title')}
        description={t('description')}
        buttons={
          <Link
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
            href="/"
          >
            <GitHubLogoIcon className="mr-2 size-5" />
            {t('button_text')}
          </Link>
        }
      />
    </Section>
  );
};

export { CTA };
