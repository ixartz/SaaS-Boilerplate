import Link from 'next/link';
import { unstable_setRequestLocale } from 'next-intl/server';

import { HeroAutoDemo } from '@/features/strix-store/components/HeroAutoDemo';
import { CAPABILITIES } from '@/features/strix-store/governance/capabilities';
import { POLICIES } from '@/features/strix-store/governance/policies';
import { SCENARIOS } from '@/features/strix-store/scenarios';

export default function StrixStoreOverviewPage(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);
  const criticalCaps = Object.values(CAPABILITIES).filter(c => c.risk === 'critical');
  return (
    <div className="space-y-14">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium uppercase tracking-[0.2em] text-emerald-300">
            Live demo
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            A merch shop where
            {' '}
            <span className="bg-gradient-to-r from-emerald-300 to-teal-500 bg-clip-text text-transparent">nothing bad happens</span>
            {' '}
            — because Strix doesn't let it.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/65">
            Real products. Real orders. Real customer records. Then a live agent tries to refund the week, reprice the catalog, wipe inventory, or grant itself admin. Watch Strix intercept every one.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/strix-store/agent"
              className="rounded-md bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-emerald-400"
            >
              Run a demo scenario →
            </Link>
            <Link
              href="/strix-store/shop"
              className="rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10"
            >
              Browse the shop
            </Link>
            <Link
              href="/strix-store/admin"
              className="rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10"
            >
              Open admin
            </Link>
          </div>
        </div>
        <HeroAutoDemo />
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile value={String(Object.keys(CAPABILITIES).length)} label="Governed capabilities" />
        <StatTile value={String(POLICIES.length)} label="Policy rules" />
        <StatTile value={String(SCENARIOS.length)} label="Attack scenarios" />
        <StatTile value="100%" label="Critical actions intercepted" />
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Critical capabilities, governed</h2>
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {criticalCaps.map(c => (
            <div key={c.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="font-mono text-xs text-rose-300">{c.id}</div>
              <div className="mt-1 text-sm font-semibold text-white">{c.name}</div>
              <p className="mt-1 text-sm text-white/60">{c.description}</p>
              <div className="mt-3 text-[11px] text-white/40">
                Blast radius:
                {' '}
                {c.blastRadius}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Demo scenarios</h2>
          <p className="mt-3 max-w-md text-white/60">
            Five high-risk actions, each staged with real-looking agent intent. Pick one on the Agent Console and watch Strix stop it before it executes.
          </p>
          <Link
            href="/strix-store/agent"
            className="mt-4 inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/85"
          >
            Open Agent Console →
          </Link>
        </div>
        <ul className="divide-y divide-white/5 rounded-xl border border-white/5 bg-white/[0.02]">
          {SCENARIOS.map(s => (
            <li key={s.id} className="flex items-start justify-between gap-4 p-4">
              <div>
                <div className="text-sm font-semibold text-white">{s.title}</div>
                <div className="text-sm text-white/55">{s.subtitle}</div>
              </div>
              <span className="shrink-0 rounded-md border border-rose-500/40 bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-rose-300">
                {s.riskLabel}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
      <div className="text-3xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-white/50">{label}</div>
    </div>
  );
}
