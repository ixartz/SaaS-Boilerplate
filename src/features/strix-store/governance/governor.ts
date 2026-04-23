import { CAPABILITIES } from './capabilities';
import type { ActionContext, Decision, Principal } from './policies';
import { POLICIES } from './policies';
import { buildReceipt, type Receipt } from './receipts';

export type GovernedRequest = {
  capabilityId: keyof typeof CAPABILITIES | string;
  principal: Principal;
  args?: Record<string, unknown>;
  estimatedImpact?: ActionContext['estimatedImpact'];
  // When false, the evaluation does not advance the main receipt chain.
  // Used by the hero/auto-play surfaces so their marketing loop doesn't
  // poison the real audit sequence the rest of the app shows.
  mutateChain?: boolean;
};

export type GovernedResponse = {
  decision: Decision;
  reason: string;
  policyId: string;
  receipt: Receipt;
};

export function evaluate(req: GovernedRequest): GovernedResponse {
  const mutateChain = req.mutateChain !== false;
  const capability = CAPABILITIES[req.capabilityId];
  if (!capability) {
    const fallback = CAPABILITIES['orders.read']!;
    const ctx: ActionContext = {
      capability: fallback,
      principal: req.principal,
      args: req.args ?? {},
      estimatedImpact: req.estimatedImpact ?? {},
    };
    const receipt = buildReceipt({
      decision: 'block',
      reason: `Unknown capability '${req.capabilityId}'. Unknown capabilities are blocked by default.`,
      policyId: 'pol.deny.unknown_capability',
      ctx,
      mutateChain,
    });
    return {
      decision: 'block',
      reason: receipt.reason,
      policyId: receipt.policyId,
      receipt,
    };
  }

  const ctx: ActionContext = {
    capability,
    principal: req.principal,
    args: req.args ?? {},
    estimatedImpact: req.estimatedImpact ?? {},
  };

  for (const rule of POLICIES) {
    if (!rule.match(ctx)) {
      continue;
    }
    const verdict = rule.decide(ctx);
    if (verdict) {
      const receipt = buildReceipt({
        decision: verdict.decision,
        reason: verdict.reason,
        policyId: verdict.policyId,
        ctx,
        mutateChain,
      });
      return {
        decision: verdict.decision,
        reason: verdict.reason,
        policyId: verdict.policyId,
        receipt,
      };
    }
  }

  const receipt = buildReceipt({
    decision: 'allow',
    reason: 'No policy matched. Default-allow for this capability tier.',
    policyId: 'pol.default.allow',
    ctx,
    mutateChain,
  });
  return {
    decision: 'allow',
    reason: receipt.reason,
    policyId: receipt.policyId,
    receipt,
  };
}
