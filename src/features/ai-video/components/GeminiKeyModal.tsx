'use client';

import { Eye, EyeOff, KeyRound, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const GEMINI_KEY_STORAGE = 'vidoflip:gemini_key';

type GeminiKeyModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called whenever the active key changes (save or clear). */
  onKeyChange: (key: string | null) => void;
};

export function GeminiKeyModal({ open, onOpenChange, onKeyChange }: GeminiKeyModalProps) {
  const [input, setInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  // Load existing key into input when modal opens
  useEffect(() => {
    if (open) {
      const stored = localStorage.getItem(GEMINI_KEY_STORAGE) ?? '';
      setInput(stored);
      setHasSaved(stored.length > 0);
      setShowKey(false);
    }
  }, [open]);

  const handleSave = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    localStorage.setItem(GEMINI_KEY_STORAGE, trimmed);
    onKeyChange(trimmed);
    setHasSaved(true);
    onOpenChange(false);
  };

  const handleClear = () => {
    localStorage.removeItem(GEMINI_KEY_STORAGE);
    setInput('');
    setHasSaved(false);
    onKeyChange(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="size-5 text-purple-500" />
            Gemini API Key
          </DialogTitle>
          <DialogDescription>
            Your key is stored only in your browser's localStorage — it is never sent to our
            servers. Requests go directly from your browser to Google's Gemini API.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
              placeholder="AIza…"
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShowKey(p => !p)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showKey ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>

          {hasSaved && (
            <p className="flex items-center gap-1.5 text-xs text-green-600">
              <span className="inline-block size-1.5 rounded-full bg-green-500" />
              API key is saved
            </p>
          )}

          <p className="text-xs text-gray-500">
            Get a free key at{' '}
            <span className="font-medium text-gray-700">aistudio.google.com</span>.
            The key needs access to the <em>Gemini File API</em> and{' '}
            <em>gemini-2.5-flash</em>.
          </p>
        </div>

        <DialogFooter className="gap-2">
          {hasSaved && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="mr-1.5 size-3.5" />
              Clear key
            </Button>
          )}
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!input.trim()}
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            Save &amp; close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
