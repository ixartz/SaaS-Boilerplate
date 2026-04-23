import type { ActionContext, Decision } from './policies';

export type Receipt = {
  id: string;
  hash: string;
  issuedAt: string;
  decision: Decision;
  reason: string;
  policyId: string;
  capabilityId: string;
  capabilityName: string;
  riskLevel: string;
  principal: { id: string; kind: string; name: string; role: string };
  args: Record<string, unknown>;
  estimatedImpact: ActionContext['estimatedImpact'];
  chain: {
    previousHash: string | null;
    sequence: number;
  };
};

// Deterministic 128-bit-ish hex hash (FNV-1a variant, good enough for a UI
// receipt chain — not cryptographic). Keeps the demo consistent without pulling
// a crypto dependency into the client bundle.
function fnvHash(input: string): string {
  let h1 = 0xCBF29CE4;
  let h2 = 0x84222325;
  for (let i = 0; i < input.length; i++) {
    const c = input.charCodeAt(i);
    h1 ^= c;
    h1 = Math.imul(h1, 0x01000193) >>> 0;
    h2 ^= (c * 31) >>> 0;
    h2 = Math.imul(h2, 0x01000193) >>> 0;
  }
  return (
    h1.toString(16).padStart(8, '0')
    + h2.toString(16).padStart(8, '0')
  );
}

// Mutable chain state for real decisions. The hero/auto-play surfaces pass
// `mutateChain: false` so their marketing-loop receipts don't poison the
// sequence that the admin/agent/receipt pages show.
const mainChain = { sequence: 0, previousHash: null as string | null };

export function buildReceipt(args: {
  decision: Decision;
  reason: string;
  policyId: string;
  ctx: ActionContext;
  issuedAt?: string;
  mutateChain?: boolean;
}): Receipt {
  const mutate = args.mutateChain !== false;
  const id = `rcpt_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
  const issuedAt = args.issuedAt ?? new Date().toISOString();
  const prev = mutate ? mainChain.previousHash : null;
  const seq = mutate ? mainChain.sequence : -1;
  const body = JSON.stringify({
    id,
    issuedAt,
    decision: args.decision,
    policyId: args.policyId,
    capabilityId: args.ctx.capability.id,
    principal: args.ctx.principal,
    args: args.ctx.args,
    prev,
    seq,
  });
  const hash = fnvHash(body);
  const receipt: Receipt = {
    id,
    hash,
    issuedAt,
    decision: args.decision,
    reason: args.reason,
    policyId: args.policyId,
    capabilityId: args.ctx.capability.id,
    capabilityName: args.ctx.capability.name,
    riskLevel: args.ctx.capability.risk,
    principal: args.ctx.principal,
    args: args.ctx.args,
    estimatedImpact: args.ctx.estimatedImpact,
    chain: { previousHash: prev, sequence: seq },
  };
  if (mutate) {
    mainChain.previousHash = hash;
    mainChain.sequence += 1;
  }
  return receipt;
}

export function resetReceiptChain() {
  mainChain.sequence = 0;
  mainChain.previousHash = null;
}
