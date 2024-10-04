import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { PricingInformation } from '@/features/billing/PricingInformation';
import { Section } from '@/features/landing/Section';
import { PLAN_ID } from '@/utils/AppConfig';

export const Pricing = () => {
  const t = useTranslations('Pricing');

  return (
    <Section
      subtitle={t('section_subtitle')}
      title={t('section_title')}
      description={t('section_description')}
    >
      <PricingInformation
        buttonList={{
          [PLAN_ID.FREE]: (
            <Link
              className={buttonVariants({
                size: 'sm',
                className: 'mt-5 w-full',
              })}
              href="/sign-up"
            >
              {t('button_text')}
            </Link>
          ),
          [PLAN_ID.PREMIUM]: (
            <Link
              className={buttonVariants({
                size: 'sm',
                className: 'mt-5 w-full',
              })}
              href="/sign-up"
            >
              {t('button_text')}
            </Link>
          ),
          [PLAN_ID.ENTERPRISE]: (
            <Link
              className={buttonVariants({
                size: 'sm',
                className: 'mt-5 w-full',
              })}
              href="/sign-up"
            >
              {t('button_text')}
            </Link>
          ),
        }}
      />
    </Section>
  );
};
