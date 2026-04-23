'use client';

import { useCallback, useRef, useState } from 'react';

import { cn } from '@/utils/Helpers';

import { type AgentMessage, type Scenario, SCENARIOS } from '../scenarios';
import { useStore } from '../state/useStore';
import { ProofReceiptCard } from './ProofReceiptCard';
import { DecisionPill, RiskPill } from './StrixBadge';

type FeedEntry = AgentMessage & { at: number; id: string };

type RunState = 'idle' | 'running' | 'intercepted' | 'allowed';

export function AgentConsole() {
  const { governedCall } = useStore();
  const [activeScenarioId, setActiveScenarioId] = useState<string>(SCENARIOS[0]!.id);
  const [feed, setFeed] = useState<FeedEntry[]>([]);
  const [state, setState] = useState<RunState>('idle');
  const [lastReceiptId, setLastReceiptId] = useState<string | null>(null);
  const [lastScenarioId, setLastScenarioId] = useState<string | null>(null);
  const runTokenRef = useRef(0);

  const { receipts } = useStore();
  const lastReceipt = receipts.find(r => r.id === lastReceiptId) ?? null;
  const activeScenario = SCENARIOS.find(s => s.id === activeScenarioId)!;
  const lastScenario = SCENARIOS.find(s => s.id === lastScenarioId);

  const runScenario = useCallback(async (scenario: Scenario) => {
    const token = ++runTokenRef.current;
    setFeed([]);
    setState('running');
    setLastReceiptId(null);
    setLastScenarioId(scenario.id);

    let clock = 0;
    for (const msg of scenario.transcript) {
      clock += msg.delayMs;
      await new Promise(r => setTimeout(r, msg.delayMs));
      if (runTokenRef.current !== token) {
        return;
      }
      setFeed(prev => [...prev, { ...msg, at: clock, id: `${scenario.id}-${prev.length}` }]);
    }

    await new Promise(r => setTimeout(r, 250));
    if (runTokenRef.current !== token) {
      return;
    }

    const res = governedCall({
      capabilityId: scenario.capabilityId,
      principal: scenario.principal,
      args: scenario.args,
      estimatedImpact: scenario.estimatedImpact,
    });

    setLastReceiptId(res.receipt.id);
    setFeed(prev => [...prev, {
      id: `${scenario.id}-strix`,
      delayMs: 0,
      at: clock + 250,
      kind: 'result',
      text: res.decision === 'allow'
        ? `Strix: allowed. policy=${res.policyId}`
        : res.decision === 'approval_required'
          ? `Strix: paused for approval. policy=${res.policyId}`
          : `Strix: BLOCKED. policy=${res.policyId}`,
    }]);
    setState(res.decision === 'allow' ? 'allowed' : 'intercepted');
  }, [governedCall]);

  const reset = useCallback(() => {
    runTokenRef.current++;
    setFeed([]);
    setState('idle');
    setLastReceiptId(null);
    setLastScenarioId(null);
  }, []);

  const runAll = useCallback(async () => {
    for (const scenario of SCENARIOS) {
      await runScenario(scenario);
      // Hold each intercept on screen long enough to read, but short enough
      // to keep a live demo moving.
      await new Promise(r => setTimeout(r, 1800));
      if (runTokenRef.current === 0) {
        return;
      }
    }
  }, [runScenario]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
      {/* Left: scenario picker + controls */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Demo scenarios</h2>
          <p className="mt-1 text-sm text-white/55">
            Pick an action the agent will try. Each one is a real, high-risk
            operation Strix intercepts before execution.
          </p>
        </div>
        <ul className="space-y-2">
          {SCENARIOS.map((s) => {
            const active = s.id === activeScenarioId;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setActiveScenarioId(s.id)}
                  disabled={state === 'running'}
                  className={cn(
                    'w-full rounded-xl border p-4 text-left transition-colors disabled:opacity-50',
                    active
                      ? 'border-emerald-500/40 bg-emerald-500/5'
                      : 'border-white/5 bg-white/[0.02] hover:border-white/15',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white">{s.title}</div>
                      <div className="mt-0.5 text-sm text-white/55">{s.subtitle}</div>
                    </div>
                    <span className="shrink-0 rounded-md border border-rose-500/40 bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-rose-300">
                      {s.riskLabel.split(' · ')[1] ?? 'critical'}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => runScenario(activeScenario)}
            disabled={state === 'running'}
            className="flex-1 rounded-md bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {state === 'running' ? 'Agent running…' : `Run · ${activeScenario.title}`}
          </button>
          <button
            type="button"
            onClick={runAll}
            disabled={state === 'running'}
            title="Runs all 5 scenarios in sequence. Ideal for a live demo."
            className="rounded-md border border-emerald-400/40 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/20 disabled:opacity-40"
          >
            Run all ▶
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={state === 'idle' || state === 'running'}
            className="rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white hover:bg-white/10 disabled:opacity-40"
          >
            Reset
          </button>
        </div>
        <p className="text-xs text-white/40">
          Tip: &ldquo;Run all&rdquo; executes each scenario in sequence — perfect
          for a live walkthrough. Every attempt emits a proof receipt you can
          scrub through on the Receipts tab.
        </p>
      </div>

      {/* Right: agent feed + intercept panel */}
      <div className="min-h-[520px] space-y-4">
        <AgentFeed
          feed={feed}
          scenario={lastScenario ?? activeScenario}
          state={state}
        />
        {state === 'intercepted' && lastReceipt && (
          <div className="rounded-xl border border-rose-500/40 bg-rose-500/[0.07] p-5">
            <div className="mb-3 flex items-center gap-2">
              <DecisionPill decision={lastReceipt.decision} />
              <RiskPill level={lastReceipt.riskLevel} />
              <span className="text-xs uppercase tracking-widest text-rose-300">
                Strix intercept
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white">
              {lastScenario?.title}
              {' '}
              stopped
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-rose-500/30 bg-black/40 p-3">
                <div className="mb-1.5 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-rose-300">
                  <span>✕ Without Strix</span>
                </div>
                <p className="text-sm text-white/80">{lastScenario?.counterfactual}</p>
              </div>
              <div className="rounded-lg border border-emerald-500/30 bg-black/40 p-3">
                <div className="mb-1.5 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-emerald-300">
                  <span>✓ With Strix</span>
                </div>
                <p className="text-sm text-white/80">
                  Nothing changed. The call was evaluated in
                  {' '}
                  &lt;1 ms, blocked at the boundary, and a chained proof receipt was emitted.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <ProofReceiptCard receipt={lastReceipt} href={`/strix-store/receipts/${lastReceipt.id}`} />
            </div>
          </div>
        )}
        {state === 'allowed' && lastReceipt && (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/[0.07] p-5">
            <div className="mb-3 flex items-center gap-2">
              <DecisionPill decision={lastReceipt.decision} />
              <RiskPill level={lastReceipt.riskLevel} />
            </div>
            <p className="text-sm text-white/75">Action was evaluated and allowed within policy.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AgentFeed({ feed, scenario, state }: { feed: FeedEntry[]; scenario: Scenario; state: RunState }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-emerald-400" />
          <span className="font-mono text-xs text-white/60">
            agent:
            {scenario.principal.id}
          </span>
        </div>
        <span className="text-[11px] uppercase tracking-widest text-white/40">
          {state === 'running' ? 'Live' : state === 'idle' ? 'Standby' : 'Finished'}
        </span>
      </div>
      <div className="min-h-[360px] space-y-1 p-4 font-mono text-sm">
        {feed.length === 0 && state === 'idle' && (
          <div className="text-white/40">
            Idle. Select a scenario on the left and hit
            {' '}
            <span className="text-emerald-300">Run</span>
            .
          </div>
        )}
        {feed.map(m => (
          <FeedLine key={m.id} msg={m} />
        ))}
        {state === 'running' && (
          <div className="mt-2 flex items-center gap-2 text-white/50">
            <span className="inline-flex gap-1">
              <span className="size-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:-0.25s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:-0.1s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-white/60" />
            </span>
            <span>agent thinking…</span>
          </div>
        )}
      </div>
    </div>
  );
}

function FeedLine({ msg }: { msg: FeedEntry }) {
  const prefix = {
    think: '»',
    plan: '➤',
    tool: '$',
    result: '=',
  }[msg.kind];

  const color = {
    think: 'text-white/60',
    plan: 'text-white/80',
    tool: 'text-cyan-300',
    result: msg.text.includes('BLOCKED') ? 'text-rose-300' : msg.text.startsWith('Strix') ? 'text-emerald-300' : 'text-white/70',
  }[msg.kind];

  return (
    <div className={cn('flex items-start gap-3', color)}>
      <span className="w-10 shrink-0 text-right text-[11px] text-white/30">
        +
        {(msg.at / 1000).toFixed(2)}
        s
      </span>
      <span className="w-3 shrink-0 text-white/40">{prefix}</span>
      <span className="whitespace-pre-wrap">{msg.text}</span>
    </div>
  );
}
