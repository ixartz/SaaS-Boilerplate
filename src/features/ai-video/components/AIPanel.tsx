'use client';

import { Loader2, Send, Settings, Sparkles, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTimelineStore } from '@/features/video-editor/hooks/useTimelineStore';
import { compareTimelines } from '@/features/video-editor/lib/compareTimelines';

import type { AssetUploadStatus } from '../hooks/useGeminiFileUpload';
import { callTimelineAgent } from '../lib/timelineAgent';

// ── Types ─────────────────────────────────────────────────────────────────────

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'error';
  content: string;
};

type PanelStatus = 'idle' | 'thinking';

export type AIPanelProps = {
  geminiKey: string | null;
  uploadStatusMap: Map<string, AssetUploadStatus>;
  onOpenSettings: () => void;
  onClose: () => void;
  /** Callback ref — parent stores this so Cmd+K can focus the input */
  onInputRef?: (el: HTMLTextAreaElement | null) => void;
};

// ── Diff summary ──────────────────────────────────────────────────────────────

function buildDiffSummary(current: Parameters<typeof compareTimelines>[0], proposed: Parameters<typeof compareTimelines>[1]): string {
  const { clips } = compareTimelines(current, proposed);
  const added = clips.filter(c => c.status === 'added').length;
  const removed = clips.filter(c => c.status === 'removed').length;
  const modified = clips.filter(c => c.status === 'modified').length;
  const parts: string[] = [];
  if (added) parts.push(`${added} added`);
  if (removed) parts.push(`${removed} removed`);
  if (modified) parts.push(`${modified} modified`);
  return parts.length > 0 ? parts.join(' · ') : 'No changes';
}

// ── Component ─────────────────────────────────────────────────────────────────

export function AIPanel({
  geminiKey,
  uploadStatusMap,
  onOpenSettings,
  onClose,
  onInputRef,
}: AIPanelProps) {
  const { current, proposed, setProposedState, commitProposedState, clearProposedState } =
    useTimelineStore();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<PanelStatus>('idle');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  // Expose textarea ref to parent for Cmd+K focus
  useEffect(() => {
    onInputRef?.(textareaRef.current);
  }, [onInputRef]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Keyboard shortcuts for proposal (Enter = accept, Esc = reject)
  useEffect(() => {
    if (!proposed) return;
    const handler = (e: KeyboardEvent) => {
      // Don't intercept when typing in the textarea
      if (document.activeElement === textareaRef.current) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        commitProposedState();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        clearProposedState();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [proposed, commitProposedState, clearProposedState]);

  // Auto-resize textarea
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, []);

  const handleSubmit = useCallback(async () => {
    const prompt = input.trim();
    if (!prompt || status === 'thinking' || !geminiKey) return;

    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: prompt };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setStatus('thinking');

    try {
      const proposedState = await callTimelineAgent({ prompt, state: current, geminiKey });
      const summary = buildDiffSummary(current, proposedState);
      setProposedState(proposedState);
      setMessages(prev => [
        ...prev,
        { id: crypto.randomUUID(), role: 'assistant', content: `Done! ${summary}` },
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'error',
          content: err instanceof Error ? err.message : 'AI call failed.',
        },
      ]);
    } finally {
      setStatus('idle');
    }
  }, [input, status, geminiKey, current, setProposedState]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  // Upload readiness
  const pendingUploads = [...uploadStatusMap.values()].filter(
    s => s === 'uploading' || s === 'processing',
  ).length;

  // Proposal diff summary (computed from store)
  const proposalSummary = proposed ? buildDiffSummary(current, proposed) : null;

  return (
    <div className="flex h-full w-96 flex-col border-l border-gray-200 bg-white">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-purple-500" />
          <span className="text-sm font-semibold text-gray-800">AI Editor</span>

          {/* Upload status badge */}
          {pendingUploads > 0 && (
            <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
              <Loader2 className="size-3 animate-spin" />
              {pendingUploads} uploading
            </span>
          )}
          {pendingUploads === 0 && uploadStatusMap.size > 0 && (
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              Ready
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onOpenSettings}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            title="Gemini API settings"
          >
            <Settings className="size-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            title="Close panel"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* ── Message history ──────────────────────────────────────────────────── */}
      <ScrollArea className="flex-1 px-4 py-3">
        {messages.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">
            Describe an edit and I'll update your timeline.
          </p>
        )}

        <div className="space-y-3">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : msg.role === 'error'
                      ? 'bg-red-50 text-red-700 ring-1 ring-red-200'
                      : 'bg-gray-100 text-gray-800'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {status === 'thinking' && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl bg-gray-100 px-3 py-2 text-sm text-gray-500">
                <Loader2 className="size-3.5 animate-spin" />
                Thinking…
              </div>
            </div>
          )}
        </div>

        <div ref={scrollBottomRef} />
      </ScrollArea>

      {/* ── Proposal banner ──────────────────────────────────────────────────── */}
      {proposed && (
        <div className="border-t border-gray-200 bg-indigo-50 px-4 py-3">
          <p className="mb-2 text-xs font-medium text-indigo-700">
            Proposed changes: {proposalSummary}
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-green-600 text-white hover:bg-green-700"
              onClick={commitProposedState}
            >
              Accept
              <kbd className="ml-1.5 rounded bg-green-700/40 px-1 text-[10px]">↵</kbd>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={clearProposedState}
            >
              Reject
              <kbd className="ml-1.5 rounded bg-red-100 px-1 text-[10px]">Esc</kbd>
            </Button>
          </div>
        </div>
      )}

      {/* ── No-key state ─────────────────────────────────────────────────────── */}
      {!geminiKey && (
        <div className="border-t border-gray-200 px-4 py-4 text-center">
          <p className="mb-3 text-sm text-gray-500">
            Add your Gemini API key to start AI editing.
          </p>
          <Button size="sm" variant="outline" onClick={onOpenSettings}>
            <Settings className="mr-1.5 size-3.5" />
            Add API Key
          </Button>
        </div>
      )}

      {/* ── Input area ───────────────────────────────────────────────────────── */}
      {geminiKey && (
        <div className="border-t border-gray-200 p-3">
          <div className="flex items-end gap-2 rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-400">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Describe an edit… (Enter to send)"
              disabled={status === 'thinking'}
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 disabled:opacity-60"
              style={{ minHeight: '24px', maxHeight: '120px' }}
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!input.trim() || status === 'thinking'}
              className="flex-shrink-0 rounded-lg bg-indigo-600 p-1.5 text-white transition-colors hover:bg-indigo-700 disabled:opacity-40"
              title="Send (Enter)"
            >
              <Send className="size-3.5" />
            </button>
          </div>
          <p className="mt-1.5 text-center text-[10px] text-gray-400">
            <kbd className="rounded bg-gray-200 px-1">Shift+Enter</kbd> for new line
          </p>
        </div>
      )}
    </div>
  );
}
