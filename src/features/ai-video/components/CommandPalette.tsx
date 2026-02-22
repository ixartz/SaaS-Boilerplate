'use client';

import { Loader2, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { useTimelineStore } from '@/features/video-editor/hooks/useTimelineStore';

import type { AssetUploadStatus } from '../hooks/useGeminiFileUpload';
import { callTimelineAgent } from '../lib/timelineAgent';

type CommandPaletteProps = {
  geminiKey: string;
  /** Upload statuses so we can warn the user if videos aren't ready. */
  uploadStatusMap: Map<string, AssetUploadStatus>;
  onOpen?: () => void;
  onClose?: () => void;
};

type PaletteStatus = 'idle' | 'thinking' | 'error';

export function CommandPalette({
  geminiKey,
  uploadStatusMap,
  onOpen,
  onClose,
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<PaletteStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { current, setProposedState } = useTimelineStore();

  // ── Keyboard shortcut: Cmd/Ctrl+K ────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      onOpen?.();
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      onClose?.();
    }
  }, [isOpen, onOpen, onClose]);

  const close = () => {
    setIsOpen(false);
    setStatus('idle');
    setErrorMsg(null);
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === 'thinking') return;

    setStatus('thinking');
    setErrorMsg(null);

    try {
      const proposed = await callTimelineAgent({
        prompt: input.trim(),
        state: current,
        geminiKey,
      });
      setProposedState(proposed);
      setInput('');
      close();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'AI call failed.');
      setStatus('error');
    }
  };

  // ── Upload readiness warning ───────────────────────────────────────────────
  const pendingCount = [...uploadStatusMap.values()].filter(
    s => s === 'uploading' || s === 'processing',
  ).length;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={close}
      />

      {/* Palette */}
      <div className="fixed inset-x-0 top-24 z-50 mx-auto max-w-2xl px-4">
        <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-2xl">
          {/* Input row */}
          <form onSubmit={handleSubmit} className="flex items-center gap-3 px-4 py-3">
            {status === 'thinking'
              ? <Loader2 className="size-5 flex-shrink-0 animate-spin text-purple-400" />
              : <Sparkles className="size-5 flex-shrink-0 text-purple-400" />}

            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Describe your edit… e.g. 'remove the last 5 seconds'"
              disabled={status === 'thinking'}
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-500 disabled:opacity-60"
            />

            {input.trim() && status !== 'thinking' && (
              <button
                type="submit"
                className="rounded-md bg-purple-600 px-3 py-1 text-xs font-medium text-white hover:bg-purple-500"
              >
                Edit
              </button>
            )}
          </form>

          {/* Upload warning */}
          {pendingCount > 0 && (
            <div className="border-t border-gray-800 px-4 py-2 text-xs text-yellow-400">
              <Loader2 className="mr-1.5 inline size-3 animate-spin" />
              Uploading {pendingCount} video{pendingCount > 1 ? 's' : ''} to Gemini… AI can still
              run but won't see the video content yet.
            </div>
          )}

          {/* Error */}
          {status === 'error' && errorMsg && (
            <div className="border-t border-gray-800 px-4 py-2 text-xs text-red-400">
              {errorMsg}
            </div>
          )}

          {/* Footer hints */}
          <div className="border-t border-gray-800 px-4 py-2 text-xs text-gray-600">
            <kbd className="rounded bg-gray-800 px-1 text-gray-400">Enter</kbd> to submit ·{' '}
            <kbd className="rounded bg-gray-800 px-1 text-gray-400">Esc</kbd> to close · After the
            AI edits, review the diff in the timeline and press{' '}
            <kbd className="rounded bg-gray-800 px-1 text-gray-400">Enter</kbd> to accept or{' '}
            <kbd className="rounded bg-gray-800 px-1 text-gray-400">Esc</kbd> to reject.
          </div>
        </div>
      </div>
    </>
  );
}
