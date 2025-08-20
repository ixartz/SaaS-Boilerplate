import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { CenteredHero } from '@/features/landing/CenteredHero';
import { Section } from '@/features/landing/Section';

export const Hero = () => {
  const t = useTranslations('Hero');
  const title = t.rich('title', {
    important: chunks => (
      <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text font-semibold text-transparent">
        {chunks}
      </span>
    ),
  });

  return (
    <Section className="py-36">
      <CenteredHero
        banner={null}
        title={title}
        description={t('description')}
        buttons={(
          <Link href="/sign-up">
            <Button size="lg">{t('primary_button')}</Button>
          </Link>
        )}
      />
    </Section>
  );
};
