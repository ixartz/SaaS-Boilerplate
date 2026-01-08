'use client';

import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface VideoPreviewProps {
  videoUrl: string | null;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  volume: number;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
}

export function VideoPreview({
  videoUrl,
  currentTime,
  duration,
  isPlaying,
  volume,
  onPlay,
  onPause,
  onSeek,
  onVolumeChange,
}: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Sync video element with state
  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.src = videoUrl;
    }
  }, [videoUrl]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(console.error);
      }
      else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    onSeek(newTime);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!videoUrl) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-900 rounded-lg">
        <p className="text-gray-400">No video loaded</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Video Player */}
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          onClick={() => (isPlaying ? onPause() : onPlay())}
        />

        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
            onClick={onPlay}
          >
            <div className="p-4 rounded-full bg-white/90 hover:bg-white transition-colors">
              <Play className="w-12 h-12 text-gray-900" fill="currentColor" />
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-2">
        {/* Timeline */}
        <div
          className="relative h-2 bg-gray-200 rounded-full cursor-pointer hover:h-3 transition-all"
          onClick={handleTimelineClick}
        >
          <div
            className="absolute top-0 left-0 h-full bg-primary rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-lg"
            style={{ left: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        {/* Control Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={isPlaying ? onPause : onPlay}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isPlaying
                ? (
                    <Pause className="w-5 h-5" />
                  )
                : (
                    <Play className="w-5 h-5" fill="currentColor" />
                  )}
            </button>

            {/* Time Display */}
            <div className="text-sm text-gray-600 font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Volume Control */}
          <div
            className="relative flex items-center gap-2"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <button
              type="button"
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isMuted || volume === 0
                ? (
                    <VolumeX className="w-5 h-5" />
                  )
                : (
                    <Volume2 className="w-5 h-5" />
                  )}
            </button>

            {showVolumeSlider && (
              <div className="absolute right-0 bottom-full mb-2 p-2 bg-white rounded-lg shadow-lg">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={e => onVolumeChange(Number(e.target.value))}
                  className="w-24 h-2"
                  style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
