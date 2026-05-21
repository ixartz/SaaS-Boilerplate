import type { EnumValues } from './Enum';
import type { PLAN_NAME } from '@/utils/PricingPlans';

type PlanName = EnumValues<typeof PLAN_NAME>;

export type PricingPlan = {
  name: PlanName;
  price: number;
  limits: {
    teamMember: number;
    website: number;
    storage: number;
    transfer: number;
  };
};
