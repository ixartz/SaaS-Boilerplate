'use client';

import { useState } from 'react';

import { cn } from '@/utils/Helpers';

export type LeadFormProps = {
  source: string;
  variant?: 'dark' | 'light';
  layout?: 'inline' | 'stacked';
  placeholder?: string;
  buttonLabel?: string;
  showCompany?: boolean;
  showUseCase?: boolean;
  headline?: string;
  subhead?: string;
  onSuccess?: () => void;
  className?: string;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

function readUtm(): Record<string, string> | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }
  const params = new URLSearchParams(window.location.search);
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  const out: Record<string, string> = {};
  for (const k of keys) {
    const v = params.get(k);
    if (v) {
      out[k] = v;
    }
  }
  return Object.keys(out).length ? out : undefined;
}

export function LeadForm({
  source,
  variant = 'dark',
  layout = 'inline',
  placeholder = 'you@company.com',
  buttonLabel = 'Request access',
  showCompany = false,
  showUseCase = false,
  headline,
  subhead,
  onSuccess,
  className,
}: LeadFormProps) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [useCase, setUseCase] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const dark = variant === 'dark';
  const inline = layout === 'inline' && !showCompany && !showUseCase;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      return;
    }
    setStatus('submitting');
    setError(null);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email,
          company: company || null,
          useCase: useCase || null,
          source,
          utm: readUtm(),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? 'Something went wrong. Try again.');
        setStatus('error');
        return;
      }
      setStatus('success');
      onSuccess?.();
    } catch {
      setError('Network error. Try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        className={cn(
          'rounded-xl border p-5',
          dark
            ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-200'
            : 'border-emerald-200 bg-emerald-50 text-emerald-900',
          className,
        )}
      >
        <div className="text-sm font-semibold">You're on the list.</div>
        <div className={cn('mt-1 text-sm', dark ? 'text-white/70' : 'text-emerald-800/80')}>
          We'll reach out shortly with early access details and a walkthrough link.
        </div>
      </div>
    );
  }

  const inputClass = dark
    ? 'w-full rounded-md border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/20'
    : 'w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20';

  const buttonClass = dark
    ? 'rounded-md bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60'
    : 'rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60';

  return (
    <form onSubmit={submit} className={cn('w-full', className)} noValidate>
      {(headline || subhead) && (
        <div className="mb-4">
          {headline && (
            <div
              className={cn(
                'text-base font-semibold',
                dark ? 'text-white' : 'text-slate-900',
              )}
            >
              {headline}
            </div>
          )}
          {subhead && (
            <div
              className={cn(
                'mt-1 text-sm',
                dark ? 'text-white/60' : 'text-slate-600',
              )}
            >
              {subhead}
            </div>
          )}
        </div>
      )}

      <div className={cn(inline ? 'flex flex-col gap-2 sm:flex-row' : 'flex flex-col gap-3')}>
        <label className="sr-only" htmlFor={`lead-email-${source}`}>
          Work email
        </label>
        <input
          id={`lead-email-${source}`}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={placeholder}
          disabled={status === 'submitting'}
          className={inputClass}
        />

        {showCompany && (
          <>
            <label className="sr-only" htmlFor={`lead-company-${source}`}>
              Company
            </label>
            <input
              id={`lead-company-${source}`}
              type="text"
              value={company}
              onChange={e => setCompany(e.target.value)}
              placeholder="Company"
              disabled={status === 'submitting'}
              className={inputClass}
            />
          </>
        )}

        {showUseCase && (
          <>
            <label className="sr-only" htmlFor={`lead-usecase-${source}`}>
              What are you building?
            </label>
            <textarea
              id={`lead-usecase-${source}`}
              value={useCase}
              onChange={e => setUseCase(e.target.value)}
              placeholder="What are you building? (optional)"
              disabled={status === 'submitting'}
              rows={3}
              className={inputClass}
            />
          </>
        )}

        <button
          type="submit"
          disabled={status === 'submitting' || !email}
          className={cn(buttonClass, inline ? 'shrink-0' : 'w-full')}
        >
          {status === 'submitting' ? 'Sending…' : buttonLabel}
        </button>
      </div>

      {error && (
        <div
          className={cn(
            'mt-2 text-xs',
            dark ? 'text-rose-300' : 'text-rose-600',
          )}
        >
          {error}
        </div>
      )}

      <p
        className={cn(
          'mt-3 text-[11px]',
          dark ? 'text-white/35' : 'text-slate-500',
        )}
      >
        No spam. We'll only email about Strix access and the demo walkthrough.
      </p>
    </form>
  );
}
