'use client';

import { Download, Film, PanelRight, Settings, Undo } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { AIPanel } from '@/features/ai-video/components/AIPanel';
import { GeminiKeyModal, GEMINI_KEY_STORAGE } from '@/features/ai-video/components/GeminiKeyModal';
import { useGeminiFileUpload } from '@/features/ai-video/hooks/useGeminiFileUpload';
import { EditorToolbar } from '@/features/video-editor/components/EditorToolbar';
import { MergeVideosTool } from '@/features/video-editor/components/MergeVideosTool';
import { SequencePlayer } from '@/features/video-editor/components/SequencePlayer';
import { Timeline } from '@/features/video-editor/components/Timeline';
import { VideoPreview } from '@/features/video-editor/components/VideoPreview';
import { VideoUpload } from '@/features/video-editor/components/VideoUpload';
import { useTimelineStore } from '@/features/video-editor/hooks/useTimelineStore';
import { useVideoEditor } from '@/features/video-editor/hooks/useVideoEditor';
import { exportTimeline } from '@/features/video-editor/lib/exportTimeline';
import type { ExportProgress } from '@/features/video-editor/lib/exportTimeline';

export default function EditorPage() {
  const { state, actions } = useVideoEditor();
  const { current, addAsset, addClip } = useTimelineStore();

  const [isExporting, setIsExporting] = useState(false);
  const [isNLEExporting, setIsNLEExporting] = useState(false);
  const [nleExportProgress, setNLEExportProgress] = useState<ExportProgress | null>(null);
  const [mode, setMode] = useState<'editor' | 'merge'>('editor');

  // ── BYOK Gemini key ───────────────────────────────────────────────────────
  const [geminiKey, setGeminiKey] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Read key from localStorage on mount (localStorage is client-only)
  useEffect(() => {
    const stored = localStorage.getItem(GEMINI_KEY_STORAGE);
    if (stored) setGeminiKey(stored);
  }, []);

  // ── Gemini File API — auto-upload assets in the background ────────────────
  const uploadStatusMap = useGeminiFileUpload(geminiKey);

  // ── Derived state ─────────────────────────────────────────────────────────
  const hasNLEClips = current.tracks.some(t => t.clips.length > 0);

  // ── AI panel state ────────────────────────────────────────────────────────
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const panelInputRef = useRef<HTMLTextAreaElement | null>(null);

  const handlePanelInputRef = useCallback((el: HTMLTextAreaElement | null) => {
    panelInputRef.current = el;
  }, []);

  // Cmd+K: open panel (if closed) and focus input
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsPanelOpen(true);
        requestAnimationFrame(() => panelInputRef.current?.focus());
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // ── Video select: populate both legacy engine + NLE store ─────────────────
  const handleVideoSelect = async (file: File) => {
    try {
      await actions.loadVideo(file);

      // Probe metadata via a temporary video element, then register in the NLE store
      const url = URL.createObjectURL(file);
      const probe = document.createElement('video');
      probe.preload = 'metadata';
      probe.src = url;
      probe.onloadedmetadata = () => {
        const duration = probe.duration ?? 0;
        const width = probe.videoWidth ?? 1920;
        const height = probe.videoHeight ?? 1080;
        URL.revokeObjectURL(url);

        const trackId = crypto.randomUUID();
        const assetId = addAsset({ file, duration, metadata: { width, height } });
        addClip({
          assetId,
          trackId,
          timelineStart: 0,
          sourceStart: 0,
          duration,
          playbackRate: 1,
          effects: [],
        });
      };
    } catch (error) {
      console.error('Failed to load video:', error);
      // eslint-disable-next-line no-alert
      alert('Failed to load video. Please try again.');
    }
  };

  // ── Legacy single-file export ─────────────────────────────────────────────
  const handleExport = async () => {
    if (!state.videoFile) return;
    setIsExporting(true);
    try {
      const blob = await actions.exportVideo({ quality: '720p', format: 'mp4' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${state.videoFile.name.replace(/\.[^/.]+$/, '')}-edited.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      // eslint-disable-next-line no-alert
      alert('Failed to export video. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // ── NLE timeline export (Mediabunny) ──────────────────────────────────────
  const handleNLEExport = async () => {
    if (!hasNLEClips) return;
    setIsNLEExporting(true);
    setNLEExportProgress({ phase: 'preparing', progress: 0 });
    try {
      const blob = await exportTimeline(current, p => setNLEExportProgress(p));
      const firstAsset = Object.values(current.assets)[0];
      const baseName = firstAsset?.file.name.replace(/\.[^/.]+$/, '') ?? 'timeline';
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${baseName}-nle-export.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('NLE export failed:', error);
      // eslint-disable-next-line no-alert
      alert(`NLE export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsNLEExporting(false);
      setNLEExportProgress(null);
    }
  };

  const showPanel = isPanelOpen && !!state.videoFile && mode === 'editor';

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between border-b bg-white px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">VidoFlip Editor</h1>

          <div className="flex rounded-lg border border-gray-200 bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => setMode('editor')}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${mode === 'editor' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Editor
            </button>
            <button
              type="button"
              onClick={() => setMode('merge')}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${mode === 'merge' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Merge
            </button>
          </div>

          {state.videoFile && mode === 'editor' && (
            <span className="text-sm text-gray-600">{state.videoFile.name}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {state.videoFile && mode === 'editor' && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={actions.undo}
                disabled={state.editHistory.length === 0 || state.isProcessing}
              >
                <Undo className="mr-2 size-4" />
                Undo
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={actions.clearEdits}
                disabled={state.editHistory.length === 0 || state.isProcessing}
              >
                Clear Edits
              </Button>

              {/* Legacy single-file export */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                disabled={state.isProcessing || isExporting}
              >
                <Download className="mr-2 size-4" />
                {isExporting ? 'Exporting...' : 'Export'}
              </Button>

              {/* NLE timeline export */}
              {hasNLEClips && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNLEExport}
                  disabled={isNLEExporting}
                >
                  <Film className="mr-2 size-4" />
                  {isNLEExporting
                    ? `Exporting… ${nleExportProgress?.progress ?? 0}%`
                    : 'Export NLE'}
                </Button>
              )}
            </>
          )}

          {/* Settings — Gemini API key */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSettingsOpen(true)}
            title="Gemini API settings"
          >
            <Settings className="size-4" />
            {!geminiKey && <span className="ml-1.5 text-xs text-gray-400">Add AI key</span>}
          </Button>

          {/* AI panel toggle (only when in editor mode with a video) */}
          {state.videoFile && mode === 'editor' && (
            <Button
              variant={isPanelOpen ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setIsPanelOpen(p => !p)}
              title="Toggle AI panel (Cmd+K)"
            >
              <PanelRight className="size-4" />
            </Button>
          )}
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {mode === 'merge'
          ? (
              <div className="h-full flex-1 overflow-auto bg-gray-50 p-6">
                <MergeVideosTool />
              </div>
            )
          : !state.videoFile
              ? (
                  <VideoUpload onVideoSelect={handleVideoSelect} />
                )
              : (
                  <>
                    {/* Editor column */}
                    <div className="flex min-w-0 flex-1 flex-col">
                      {/* Preview area */}
                      <div className="flex-1 overflow-auto p-6">
                        <div className="mx-auto max-w-5xl space-y-4">
                          {/* SequencePlayer when NLE has clips; legacy VideoPreview otherwise */}
                          {hasNLEClips
                            ? <SequencePlayer />
                            : (
                                <VideoPreview
                                  videoUrl={state.videoUrl}
                                  currentTime={state.currentTime}
                                  duration={state.duration}
                                  isPlaying={state.isPlaying}
                                  volume={state.volume}
                                  playbackSpeed={state.playbackSpeed}
                                  rotation={state.rotation}
                                  crop={state.crop}
                                  trim={state.trim}
                                  onPlay={actions.play}
                                  onPause={actions.pause}
                                  onSeek={actions.seek}
                                  onVolumeChange={actions.setVolume}
                                />
                              )}

                          {/* Edit history (legacy toolbar operations) */}
                          {state.editHistory.length > 0 && (
                            <div className="rounded-lg border bg-white p-4">
                              <h3 className="mb-2 text-sm font-medium">Edit History</h3>
                              <div className="space-y-1">
                                {state.editHistory.map((edit, index) => (
                                  <div
                                    key={edit.timestamp}
                                    className="flex items-center gap-2 text-sm text-gray-600"
                                  >
                                    <span className="text-gray-400">#{index + 1}</span>
                                    <span className="font-medium">{edit.type}</span>
                                    <span className="text-gray-400">{JSON.stringify(edit.params)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* NLE Timeline */}
                      <Timeline />

                      {/* Legacy Toolbar */}
                      <EditorToolbar
                        duration={state.duration}
                        volume={state.volume}
                        onTrim={actions.trim}
                        onCrop={actions.crop}
                        onRotate={actions.rotate}
                        onSpeed={actions.changeSpeed}
                        onVolumeChange={actions.setVolume}
                        disabled={state.isProcessing}
                      />
                    </div>

                    {/* AI Panel column */}
                    {showPanel && (
                      <AIPanel
                        geminiKey={geminiKey}
                        uploadStatusMap={uploadStatusMap}
                        onOpenSettings={() => setSettingsOpen(true)}
                        onClose={() => setIsPanelOpen(false)}
                        onInputRef={handlePanelInputRef}
                      />
                    )}
                  </>
                )}
      </div>

      {/* ── Overlays ─────────────────────────────────────────────────────────── */}

      {/* Gemini Key Modal */}
      <GeminiKeyModal
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        onKeyChange={key => setGeminiKey(key)}
      />

      {/* Legacy processing overlay */}
      {state.isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-w-sm rounded-lg bg-white p-6">
            <div className="flex items-center gap-4">
              <div className="size-8 animate-spin rounded-full border-b-2 border-primary" />
              <div>
                <p className="font-medium">Processing...</p>
                <p className="text-sm text-gray-600">Please wait</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NLE export progress overlay */}
      {isNLEExporting && nleExportProgress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-80 rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center gap-4">
              <div className="size-8 animate-spin rounded-full border-b-2 border-primary" />
              <div>
                <p className="font-medium">Exporting NLE timeline…</p>
                <p className="text-sm capitalize text-gray-600">{nleExportProgress.phase}</p>
              </div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${nleExportProgress.progress}%` }}
              />
            </div>
            <p className="mt-2 text-right text-sm text-gray-500">{nleExportProgress.progress}%</p>
          </div>
        </div>
      )}
    </div>
  );
}
