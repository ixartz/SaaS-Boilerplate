'use client';

import { useState } from 'react';

import { LeadForm } from '@/features/leads/LeadForm';

export function DeployStrixBanner({ source = 'demo_footer' }: { source?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-14 rounded-2xl border border-white/5 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Deploy Strix
          </div>
          <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
            Wrap your agent in under 20 lines.
          </h3>
          <p className="mt-1 max-w-xl text-sm text-white/60">
            You just watched Strix stop an agent in a toy shop. The same SDK governs
            production tool calls — refunds, CRM writes, infrastructure changes. Get
            an integration guide for your stack.
          </p>
        </div>
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="shrink-0 rounded-md bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-emerald-400"
          >
            Get access →
          </button>
        )}
      </div>

      {open && (
        <div className="mt-5 border-t border-white/5 pt-5">
          <LeadForm
            source={source}
            variant="dark"
            buttonLabel="Request access"
            placeholder="work@email.com"
            showCompany
          />
        </div>
      )}
    </div>
  );
}
