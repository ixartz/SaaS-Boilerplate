import { ArrowRightIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { CTABanner } from '@/features/landing/CTABanner';
import { Section } from '@/features/landing/Section';

export const CTA = () => {
  const t = useTranslations('CTA');

  return (
    <Section>
      <CTABanner
        title={t('title')}
        description={t('description')}
        buttons={(
          <a
            className={buttonVariants({ size: 'lg' })}
            href="https://nextjs-boilerplate.com/nextjs-multi-tenant-saas-boilerplate"
          >
            {t('button_text')}
            <ArrowRightIcon className="ml-1 size-5" />
          </a>
        )}
      />
    </Section>
  );
};
