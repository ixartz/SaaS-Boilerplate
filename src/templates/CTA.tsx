import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
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
          <Link href="/sign-up">
            <Button size="lg">{t('button_text')}</Button>
          </Link>
        )}
      />
    </Section>
  );
};
