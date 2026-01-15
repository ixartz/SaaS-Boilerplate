'use client';

import { Download, Undo } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { EditorToolbar } from '@/features/video-editor/components/EditorToolbar';
import { VideoPreview } from '@/features/video-editor/components/VideoPreview';
import { VideoUpload } from '@/features/video-editor/components/VideoUpload';
import { MergeVideosTool } from '@/features/video-editor/components/MergeVideosTool';
import { useVideoEditor } from '@/features/video-editor/hooks/useVideoEditor';

export default function EditorPage() {
  const { state, actions } = useVideoEditor();
  const [isExporting, setIsExporting] = useState(false);
  const [mode, setMode] = useState<'editor' | 'merge'>('editor');

  const handleVideoSelect = async (file: File) => {
    try {
      await actions.loadVideo(file);
    }
    catch (error) {
      console.error('Failed to load video:', error);
      alert('Failed to load video. Please try again.');
    }
  };

  const handleExport = async () => {
    if (!state.videoFile) return;

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
    }
    catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export video. Please try again.');
    }
    finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">VidoFlip Editor</h1>
          
          <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
             <button 
               onClick={() => setMode('editor')}
               className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${mode === 'editor' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
             >
               Editor
             </button>
             <button 
               onClick={() => setMode('merge')}
               className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${mode === 'merge' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
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
                <Undo className="w-4 h-4 mr-2" />
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
                <Download className="w-4 h-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export'}
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {mode === 'merge' ? (
          <div className="h-full overflow-auto bg-gray-50 p-6">
            <MergeVideosTool />
          </div>
        ) : !state.videoFile ? (
          <VideoUpload onVideoSelect={handleVideoSelect} />
        ) : (
          <div className="flex flex-col h-full">
            {/* Video Preview Area */}
            <div className="flex-1 p-6 overflow-auto">
              <div className="max-w-5xl mx-auto">
                <VideoPreview
                  videoUrl={state.videoUrl}
                  currentTime={state.currentTime}
                  duration={state.duration}
                  isPlaying={state.isPlaying}
                  volume={state.volume}
                  onPlay={actions.play}
                  onPause={actions.pause}
                  onSeek={actions.seek}
                  onVolumeChange={actions.setVolume}
                />

                {/* Edit History */}
                {state.editHistory.length > 0 && (
                  <div className="mt-6 p-4 bg-white rounded-lg border">
                    <h3 className="text-sm font-medium mb-2">Edit History</h3>
                    <div className="space-y-1">
                      {state.editHistory.map((edit, index) => (
                        <div
                          key={edit.timestamp}
                          className="text-sm text-gray-600 flex items-center gap-2"
                        >
                          <span className="text-gray-400">#{index + 1}</span>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm">
            <div className="flex items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
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
