'use client';

import Link from 'next/link';

import { SCENARIOS } from '../scenarios';
import { useStore } from '../state/useStore';
import { ProofReceiptCard } from './ProofReceiptCard';

export function ReceiptsView() {
  const { receipts, governedCall } = useStore();

  if (receipts.length === 0) {
    const seed = () => {
      for (const s of SCENARIOS) {
        governedCall({
          capabilityId: s.capabilityId,
          principal: s.principal,
          args: s.args,
          estimatedImpact: s.estimatedImpact,
        });
      }
    };
    return (
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-10 text-center">
        <p className="text-white/70">No receipts yet.</p>
        <p className="mt-2 text-sm text-white/50">
          Run a scenario on the
          {' '}
          <Link className="text-emerald-300 underline" href="/strix-store/agent">Agent Console</Link>
          {' '}
          or click a red action on the
          {' '}
          <Link className="text-emerald-300 underline" href="/strix-store/admin">Admin</Link>
          {' '}
          page.
        </p>
        <div className="mt-5 flex items-center justify-center gap-2">
          <Link
            href="/strix-store/agent"
            className="rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-black hover:bg-emerald-400"
          >
            Open Agent Console →
          </Link>
          <button
            type="button"
            onClick={seed}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white hover:bg-white/10"
          >
            Seed with all scenarios
          </button>
        </div>
      </div>
    );
  }

  const counts = receipts.reduce(
    (acc, r) => {
      acc[r.decision] = (acc[r.decision] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
        <span>
          <span className="font-semibold text-white">{receipts.length}</span>
          {' '}
          total
        </span>
        <span>
          <span className="font-semibold text-rose-300">{counts.block ?? 0}</span>
          {' '}
          blocked
        </span>
        <span>
          <span className="font-semibold text-amber-300">{counts.approval_required ?? 0}</span>
          {' '}
          approval-required
        </span>
        <span>
          <span className="font-semibold text-emerald-300">{counts.allow ?? 0}</span>
          {' '}
          allowed
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {receipts.map(r => (
          <ProofReceiptCard key={r.id} receipt={r} href={`/strix-store/receipts/${r.id}`} />
        ))}
      </div>
    </div>
  );
}

export function ReceiptDetailView({ id }: { id: string }) {
  const { receipts } = useStore();
  const receipt = receipts.find(r => r.id === id);
  if (!receipt) {
    return (
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-10 text-center">
        <p className="text-white/70">Receipt not found in this session.</p>
        <p className="mt-2 text-sm text-white/50">
          Receipts are stored in-memory for the duration of your visit. Run a scenario on the
          {' '}
          <Link className="text-emerald-300 underline" href="/strix-store/agent">Agent Console</Link>
          {' '}
          to generate new ones.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <ProofReceiptCard receipt={receipt} />
      <div className="rounded-xl border border-white/5 bg-black/40 p-5">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">Raw receipt (JSON)</h3>
        <pre className="overflow-x-auto text-xs text-white/70">
          {JSON.stringify(receipt, null, 2)}
        </pre>
      </div>
    </div>
  );
}
