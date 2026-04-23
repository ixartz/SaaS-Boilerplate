'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useStore } from '../state/useStore';

// A persistent, compact indicator that makes the governance layer feel
// always-on. Shown on the shop and admin pages (not on the agent console
// itself, since the agent console is the detailed view of the same data).
export function GovernorRail() {
  const { receipts } = useStore();
  const pathname = usePathname();
  const stripped = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';

  const hidden
    = stripped === '/strix-store'
    || stripped.startsWith('/strix-store/agent')
    || stripped.startsWith('/strix-store/receipts');

  if (hidden) {
    return null;
  }

  const blocked = receipts.filter(r => r.decision === 'block').length;
  const approvals = receipts.filter(r => r.decision === 'approval_required').length;
  const allowed = receipts.filter(r => r.decision === 'allow').length;
  const latest = receipts[0];

  return (
    <div className="fixed inset-x-0 bottom-4 z-30 flex justify-center px-4">
      <div className="pointer-events-auto flex w-full max-w-3xl flex-wrap items-center gap-3 rounded-full border border-white/10 bg-[#0b0c10]/90 px-3 py-1.5 shadow-lg backdrop-blur sm:gap-4 sm:px-4 sm:py-2">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex">
            <span className="size-2 rounded-full bg-emerald-400" />
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/80">
            Strix active
          </span>
        </div>
        <div className="hidden items-center gap-3 text-[11px] text-white/60 sm:flex">
          <span>
            <span className="font-semibold text-rose-300">{blocked}</span>
            {' '}
            blocked
          </span>
          <span>
            <span className="font-semibold text-amber-300">{approvals}</span>
            {' '}
            approvals
          </span>
          <span>
            <span className="font-semibold text-emerald-300">{allowed}</span>
            {' '}
            allowed
          </span>
        </div>
        {latest && (
          <Link
            href={`/strix-store/receipts/${latest.id}`}
            className="hidden max-w-[220px] truncate rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-white/70 hover:bg-white/10 md:inline-block"
            title="View latest receipt"
          >
            {latest.capabilityId}
            {' '}
            ·
            {' '}
            {latest.decision}
          </Link>
        )}
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/strix-store/agent"
            className="rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-semibold text-black hover:bg-emerald-400"
          >
            Trigger an attack →
          </Link>
        </div>
      </div>
    </div>
  );
}
