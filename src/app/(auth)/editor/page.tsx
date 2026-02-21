'use client';

import { Download, Undo } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { EditorToolbar } from '@/features/video-editor/components/EditorToolbar';
import { MergeVideosTool } from '@/features/video-editor/components/MergeVideosTool';
import { VideoPreview } from '@/features/video-editor/components/VideoPreview';
import { VideoUpload } from '@/features/video-editor/components/VideoUpload';
import { useVideoEditor } from '@/features/video-editor/hooks/useVideoEditor';

export default function EditorPage() {
  const { state, actions } = useVideoEditor();
  const [isExporting, setIsExporting] = useState(false);
  const [mode, setMode] = useState<'editor' | 'merge'>('editor');

  const handleVideoSelect = async (file: File) => {
    try {
      await actions.loadVideo(file);
    } catch (error) {
      console.error('Failed to load video:', error);
      // eslint-disable-next-line no-alert
      alert('Failed to load video. Please try again.');
    }
  };

  const handleExport = async () => {
    if (!state.videoFile) {
      return;
    }

    setIsExporting(true);
    try {
      const blob = await actions.exportVideo({ quality: '720p', format: 'mp4' });

      // Download the exported video
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

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* Header */}
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
            <span className="text-sm text-gray-600">
              {state.videoFile.name}
            </span>
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

              <Button
                variant="default"
                size="sm"
                onClick={handleExport}
                disabled={state.isProcessing || isExporting}
              >
                <Download className="mr-2 size-4" />
                {isExporting ? 'Exporting...' : 'Export'}
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {mode === 'merge'
          ? (
              <div className="h-full overflow-auto bg-gray-50 p-6">
                <MergeVideosTool />
              </div>
            )
          : !state.videoFile
              ? (
                  <VideoUpload onVideoSelect={handleVideoSelect} />
                )
              : (
                  <div className="flex h-full flex-col">
                    {/* Video Preview Area */}
                    <div className="flex-1 overflow-auto p-6">
                      <div className="mx-auto max-w-5xl">
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

                        {/* Edit History */}
                        {state.editHistory.length > 0 && (
                          <div className="mt-6 rounded-lg border bg-white p-4">
                            <h3 className="mb-2 text-sm font-medium">Edit History</h3>
                            <div className="space-y-1">
                              {state.editHistory.map((edit, index) => (
                                <div
                                  key={edit.timestamp}
                                  className="flex items-center gap-2 text-sm text-gray-600"
                                >
                                  <span className="text-gray-400">
                                    #
                                    {index + 1}
                                  </span>
                                  <span className="font-medium">{edit.type}</span>
                                  <span className="text-gray-400">
                                    {JSON.stringify(edit.params)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Toolbar */}
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
                )}
      </div>

      {/* Processing Overlay */}
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
    </div>
  );
}
