'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { LeadForm } from '@/features/leads/LeadForm';

import { useStore } from '../state/useStore';
import { ProofReceiptCard } from './ProofReceiptCard';

export function StrixInterceptModal() {
  const { receipts, lastInterceptedReceiptId, dismissIntercept } = useStore();
  const receipt = receipts.find(r => r.id === lastInterceptedReceiptId);
  const [showLeadForm, setShowLeadForm] = useState(false);

  useEffect(() => {
    if (!receipt) {
      return;
    }
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dismissIntercept();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [receipt, dismissIntercept]);

  useEffect(() => {
    if (receipt) {
      setShowLeadForm(false);
    }
  }, [receipt?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!receipt) {
    return null;
  }

  const title = receipt.decision === 'block' ? 'Action blocked' : 'Approval required';
  const accent = receipt.decision === 'block' ? 'from-rose-500/20' : 'from-amber-500/20';
  const borderColor = receipt.decision === 'block' ? 'border-rose-500/40' : 'border-amber-500/40';

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/75 p-4 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-2xl overflow-hidden rounded-2xl border ${borderColor} bg-[#0b0c10] shadow-2xl`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="strix-intercept-title"
      >
        <div className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${accent} to-transparent`} />
        <div className="relative p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] uppercase tracking-[0.2em] text-white/70">
                <span className="inline-block size-1.5 animate-pulse rounded-full bg-rose-400" />
                Strix intercept
              </div>
              <h2 id="strix-intercept-title" className="text-2xl font-semibold text-white sm:text-3xl">
                {title}
              </h2>
              <p className="mt-1 text-sm text-white/60">
                A governed action was stopped before execution. Nothing was changed.
              </p>
            </div>
            <button
              type="button"
              onClick={dismissIntercept}
              className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70 hover:bg-white/10"
            >
              Close (esc)
            </button>
          </div>

          <div className="mt-6">
            <ProofReceiptCard receipt={receipt} />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-5">
            <p className="max-w-md text-xs text-white/50">
              This proof receipt is cryptographically chained to prior decisions. Share it as evidence that the action was evaluated, logged, and stopped.
            </p>
            <div className="flex gap-2">
              <Link
                href={`/strix-store/receipts/${receipt.id}`}
                className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10"
              >
                View full receipt
              </Link>
              {!showLeadForm && (
                <button
                  type="button"
                  onClick={() => setShowLeadForm(true)}
                  className="rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold text-black hover:bg-emerald-400"
                >
                  Run this on your stack →
                </button>
              )}
              <button
                type="button"
                onClick={dismissIntercept}
                className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>

          {showLeadForm && (
            <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.04] p-5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">
                    Want Strix wrapping your real agent?
                  </div>
                  <div className="mt-0.5 text-xs text-white/55">
                    We'll send you a 10-minute integration guide + sample receipts on your own tools.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLeadForm(false)}
                  className="text-xs text-white/40 hover:text-white/70"
                >
                  Skip
                </button>
              </div>
              <LeadForm
                source={`intercept_${receipt.capabilityId}`}
                variant="dark"
                buttonLabel="Send me access"
                placeholder="work@email.com"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
