import type { PricingPlan } from '@/types/Subscription';

/** Pricing plans */
export const PLAN_NAME = {
  FREE: 'free',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise',
} as const;

/** Configuration for the Free subscription plan. */
const FreePlan: PricingPlan = {
  name: PLAN_NAME.FREE,
  price: 0,
  limits: {
    teamMember: 2,
    website: 2,
    storage: 2,
    transfer: 2,
  },
};

/** List of paid subscription plans. */
const PaidPlans: PricingPlan[] = [
  {
    name: PLAN_NAME.PREMIUM,
    price: 79, // Due to bugs in Alchemy.run, use a new `lookupKey` when changing price
    limits: {
      teamMember: 5,
      website: 5,
      storage: 5,
      transfer: 5,
    },
  },
  {
    name: PLAN_NAME.ENTERPRISE,
    price: 199, // Due to bugs in Alchemy.run, use a new `lookupKey` when changing price
    limits: {
      teamMember: 100,
      website: 100,
      storage: 100,
      transfer: 100,
    },
  },
];

export const AllPlans = [FreePlan, ...PaidPlans];
