'use client';
import { AIChatInterface } from '@/features/ai-video/components/AIChatInterface';
import { VideoPreview } from '@/features/video-editor/components/VideoPreview';
import { VideoUpload } from '@/features/video-editor/components/VideoUpload';
import { useVideoEditor } from '@/features/video-editor/hooks/useVideoEditor';

export const AIVideoEditor = () => {
  const { state, actions, videoElement } = useVideoEditor();
  const { videoUrl, isProcessing } = state;

  const handleFileSelect = async (file: File) => {
    try {
      await actions.loadVideo(file);
    } catch (error) {
      console.error('Failed to load video:', error);
    }
  };

  return (
    <div className="grid h-[calc(100vh-4rem)] grid-cols-1 gap-6 p-6 lg:grid-cols-3">
      {/* Left Panel: Video Preview */}
      <div className="lg:col-span-2">
        <div className="flex h-full flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">AI Video Editor</h1>
          </div>

          <div className="flex-1 overflow-hidden rounded-xl border bg-black/5 shadow-sm">
            {!videoUrl
              ? (
                  <div className="flex h-full items-center justify-center p-12">
                    <VideoUpload onVideoSelect={handleFileSelect} />
                  </div>
                )
              : (
                  <div className="relative flex h-full flex-col items-center justify-center bg-black">
                    <VideoPreview
                      videoUrl={videoUrl}
                      isPlaying={state.isPlaying}
                      onPlay={actions.play}
                      onPause={actions.pause}
                      onVolumeChange={actions.setVolume}
                      volume={state.volume}
                      currentTime={state.currentTime}
                      duration={state.duration}
                      onSeek={actions.seek}
                      playbackSpeed={state.playbackSpeed}
                      rotation={state.rotation}
                      crop={state.crop}
                      trim={state.trim}
                    />

                    {/* Hidden video element for processing references */}
                    {videoElement && (
                      <div className="hidden">
                        {/* The video element is managed by the hook/engine,
                        but we can render debug info here if needed */}
                      </div>
                    )}
                  </div>
                )}
          </div>

          {/* Editor Status Bar */}
          <div className="flex items-center justify-between rounded-lg border bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm">
            <div>
              {state.videoFile ? state.videoFile.name : 'No video loaded'}
            </div>
            <div>
              {isProcessing
                ? (
                    <span className="flex items-center gap-2 text-blue-500">
                      <span className="inline-block size-2 animate-pulse rounded-full bg-current" />
                      Processing...
                    </span>
                  )
                : (
                    <span>Ready</span>
                  )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: AI Chat Interface */}
      <div className="h-full overflow-hidden rounded-xl border bg-card shadow-sm">
        <AIChatInterface actions={actions} videoState={state} />
      </div>
    </div>
  );
};
