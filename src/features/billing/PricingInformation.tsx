import { useTranslations } from 'next-intl';

import { PricingCard } from '@/features/billing/PricingCard';
import { PricingFeature } from '@/features/billing/PricingFeature';
import type { PlanId } from '@/types/Subscription';
import { PricingPlanList } from '@/utils/AppConfig';

const PricingInformation = (props: {
  buttonList: Record<PlanId, React.ReactNode>;
}) => {
  const t = useTranslations('PricingPlan');

  return (
    <div className="grid grid-cols-3 gap-x-6">
      {PricingPlanList.map((plan) => (
        <PricingCard
          key={plan.id}
          planId={plan.id}
          price={plan.price}
          interval={plan.interval}
          button={props.buttonList[plan.id]}
        >
          <PricingFeature>
            {t('feature_team_member', {
              number: plan.features.teamMember,
            })}
          </PricingFeature>

          <PricingFeature>
            {t('feature_website', {
              number: plan.features.website,
            })}
          </PricingFeature>

          <PricingFeature>
            {t('feature_storage', {
              number: plan.features.storage,
            })}
          </PricingFeature>

          <PricingFeature>
            {t('feature_transfer', {
              number: plan.features.transfer,
            })}
          </PricingFeature>

          <PricingFeature>{t('feature_email_support')}</PricingFeature>
        </PricingCard>
      ))}
    </div>
  );
};

export { PricingInformation };
