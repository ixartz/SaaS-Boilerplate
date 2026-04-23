'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/utils/Helpers';

import { evaluate, type GovernedResponse } from '../governance/governor';
import { SCENARIOS } from '../scenarios';

type Line = { kind: 'think' | 'plan' | 'tool' | 'result'; text: string; at: number };

// Tight subset of scenarios suitable for a 10-15s autoplay loop.
const FEATURED = ['bulk-refund', 'price-reset', 'inventory-wipe'];

function scenarioById(id: string) {
  return SCENARIOS.find(s => s.id === id)!;
}

function formatImpact(scenarioId: string): string {
  const s = scenarioById(scenarioId);
  if (s.estimatedImpact.dollarsCents) {
    return `$${(s.estimatedImpact.dollarsCents / 100).toLocaleString()} · ${s.estimatedImpact.recordCount?.toLocaleString() ?? '?'} records`;
  }
  if (s.estimatedImpact.recordCount) {
    return `${s.estimatedImpact.recordCount.toLocaleString()} records`;
  }
  return 'high blast radius';
}

export function HeroAutoDemo() {
  const [idx, setIdx] = useState(0);
  const [lines, setLines] = useState<Line[]>([]);
  const [verdict, setVerdict] = useState<GovernedResponse | null>(null);
  const [paused, setPaused] = useState(false);
  const tokenRef = useRef(0);

  const current = scenarioById(FEATURED[idx % FEATURED.length]!);

  const play = useCallback(async (scenarioId: string) => {
    const token = ++tokenRef.current;
    const scenario = scenarioById(scenarioId);
    setLines([]);
    setVerdict(null);

    // Compress transcript timings for hero. Max ~6s of setup.
    let clock = 0;
    for (const m of scenario.transcript) {
      const delay = Math.min(m.delayMs, 300);
      clock += delay;
      await new Promise(r => setTimeout(r, delay));
      if (tokenRef.current !== token) {
        return;
      }
      setLines(prev => [...prev, { kind: m.kind, text: m.text, at: clock }]);
    }
    await new Promise(r => setTimeout(r, 220));
    if (tokenRef.current !== token) {
      return;
    }
    const res = evaluate({
      capabilityId: scenario.capabilityId,
      principal: scenario.principal,
      args: scenario.args,
      estimatedImpact: scenario.estimatedImpact,
      mutateChain: false,
    });
    setVerdict(res);
    // Hold on the verdict for a few seconds, then advance.
    await new Promise(r => setTimeout(r, 3400));
    if (tokenRef.current !== token) {
      return;
    }
    setIdx(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (paused) {
      return;
    }
    play(current.id);
    // Cancel the in-flight run when this effect tears down.
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      tokenRef.current++;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, paused]);

  const replay = () => {
    tokenRef.current++;
    setLines([]);
    setVerdict(null);
    play(current.id);
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-rose-500/10 via-transparent to-emerald-500/5 p-5 shadow-2xl sm:p-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-rose-300">
          <span className="size-1.5 animate-pulse rounded-full bg-rose-400" />
          Live · agent attempting a governed action
        </div>
        <div className="flex items-center gap-2 text-[11px] text-white/50">
          <span className="font-mono">
            {String((idx % FEATURED.length) + 1).padStart(2, '0')}
            /
            {String(FEATURED.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={replay}
            className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 hover:bg-white/10"
          >
            Replay
          </button>
        </div>
      </div>

      <div className="mt-3">
        <div className="text-sm font-semibold text-white">{current.title}</div>
        <div className="text-xs text-white/50">{current.subtitle}</div>
      </div>

      <div className="mt-3 h-[210px] space-y-1 overflow-hidden rounded-md border border-white/5 bg-black/50 p-3 font-mono text-[12px] leading-[1.35] text-white/80">
        {lines.map(l => (
          <FeedLine key={`${current.id}-${l.at}-${l.text}`} line={l} />
        ))}
        {!verdict && (
          <div className="mt-1 flex items-center gap-2 text-white/40">
            <span className="inline-flex gap-1">
              <span className="size-1 animate-bounce rounded-full bg-white/60 [animation-delay:-0.25s]" />
              <span className="size-1 animate-bounce rounded-full bg-white/60 [animation-delay:-0.1s]" />
              <span className="size-1 animate-bounce rounded-full bg-white/60" />
            </span>
            <span>agent thinking…</span>
          </div>
        )}
      </div>

      {verdict && (
        <div className="mt-3 rounded-md border border-rose-500/50 bg-rose-500/10 p-3 text-rose-100 shadow-[0_0_0_1px_rgba(244,63,94,0.2)_inset]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-rose-300">
              <span>Strix intercept</span>
              <span className="rounded bg-rose-500/30 px-1.5 py-0.5 text-[10px] font-bold">BLOCKED</span>
            </div>
            <span className="font-mono text-[10px] text-rose-300/80">
              {verdict.receipt.id}
            </span>
          </div>
          <div className="mt-1.5 text-sm">
            <code className="rounded bg-black/40 px-1.5 py-0.5 text-white/90">{verdict.receipt.capabilityId}</code>
            {' '}
            rejected ·
            {' '}
            <span className="text-white/75">{formatImpact(current.id)}</span>
          </div>
          <div className="mt-1 line-clamp-2 text-xs text-rose-100/80">{verdict.reason}</div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="text-[11px] text-white/40">
          Hover to pause · cycles through
          {' '}
          {FEATURED.length}
          {' '}
          scenarios
        </div>
        <Link
          href="/strix-store/agent"
          className="text-xs font-medium text-emerald-300 hover:text-emerald-200"
        >
          Try it yourself →
        </Link>
      </div>
    </div>
  );
}

function FeedLine({ line }: { line: Line }) {
  const prefix = { think: '»', plan: '➤', tool: '$', result: '=' }[line.kind];
  const color = {
    think: 'text-white/60',
    plan: 'text-white/80',
    tool: 'text-cyan-300',
    result: 'text-white/70',
  }[line.kind];
  return (
    <div className={cn('flex items-start gap-2', color)}>
      <span className="w-3 shrink-0 text-white/35">{prefix}</span>
      <span className="truncate">{line.text}</span>
    </div>
  );
}
