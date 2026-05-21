import type { PricingPlan } from '@/types/Subscription';
import { useTranslations } from 'next-intl';
import { PricingFeatureItem } from './PricingFeatureItem';

export const PricingFeatureList = (props: Pick<PricingPlan, 'limits'>) => {
  const t = useTranslations('PricingFeatures');

  return (
    <>
      <PricingFeatureItem>
        {t('feature_team_member', {
          number: props.limits.teamMember,
        })}
      </PricingFeatureItem>

      <PricingFeatureItem>
        {t('feature_website', {
          number: props.limits.website,
        })}
      </PricingFeatureItem>

      <PricingFeatureItem>
        {t('feature_storage', {
          number: props.limits.storage,
        })}
      </PricingFeatureItem>

      <PricingFeatureItem>
        {t('feature_transfer', {
          number: props.limits.transfer,
        })}
      </PricingFeatureItem>

      <PricingFeatureItem>{t('feature_email_support')}</PricingFeatureItem>
    </>
  );
};
