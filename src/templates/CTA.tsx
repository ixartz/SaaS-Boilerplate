import { useTranslations } from 'next-intl';

import { Section } from '@/features/landing/Section';
import { LeadForm } from '@/features/leads/LeadForm';

export const CTA = () => {
  const t = useTranslations('CTA');

  return (
    <Section>
      <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 px-6 py-12 sm:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            {t('description')}
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-xl">
          <LeadForm
            source="landing_cta"
            variant="light"
            showCompany
            showUseCase
            buttonLabel="Request access"
            layout="stacked"
          />
        </div>
      </div>
    </Section>
  );
};
