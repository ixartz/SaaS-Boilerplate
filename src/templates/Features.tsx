import { useTranslations } from 'next-intl';

import { Background } from '@/components/Background';
import { FeatureCard } from '@/features/landing/FeatureCard';
import { Section } from '@/features/landing/Section';

function CapabilityIcon() {
  return (
    <svg className="stroke-primary-foreground stroke-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 0h24v24H0z" stroke="none" />
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function PolicyIcon() {
  return (
    <svg className="stroke-primary-foreground stroke-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M12 3l8 4v6c0 4.5-3.5 7.5-8 8-4.5-.5-8-3.5-8-8V7l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function ReceiptIcon() {
  return (
    <svg className="stroke-primary-foreground stroke-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-3-2-2 2-2-2-2 2-2-2-3 2z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  );
}

function SdkIcon() {
  return (
    <svg className="stroke-primary-foreground stroke-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" />
    </svg>
  );
}

function HitlIcon() {
  return (
    <svg className="stroke-primary-foreground stroke-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 0h24v24H0z" stroke="none" />
      <circle cx="12" cy="8" r="4" />
      <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
    </svg>
  );
}

function AuditIcon() {
  return (
    <svg className="stroke-primary-foreground stroke-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M4 6h16M4 12h16M4 18h10" />
      <path d="M18 16l2 2 3-3" />
    </svg>
  );
}

export const Features = () => {
  const t = useTranslations('Features');

  return (
    <Background>
      <Section
        subtitle={t('section_subtitle')}
        title={t('section_title')}
        description={t('section_description')}
      >
        <div className="grid grid-cols-1 gap-x-3 gap-y-8 md:grid-cols-3">
          <FeatureCard icon={<CapabilityIcon />} title={t('feature1_title')}>
            {t('feature1_description')}
          </FeatureCard>
          <FeatureCard icon={<PolicyIcon />} title={t('feature2_title')}>
            {t('feature2_description')}
          </FeatureCard>
          <FeatureCard icon={<ReceiptIcon />} title={t('feature3_title')}>
            {t('feature3_description')}
          </FeatureCard>
          <FeatureCard icon={<SdkIcon />} title={t('feature4_title')}>
            {t('feature4_description')}
          </FeatureCard>
          <FeatureCard icon={<HitlIcon />} title={t('feature5_title')}>
            {t('feature5_description')}
          </FeatureCard>
          <FeatureCard icon={<AuditIcon />} title={t('feature6_title')}>
            {t('feature6_description')}
          </FeatureCard>
        </div>
      </Section>
    </Background>
  );
};
