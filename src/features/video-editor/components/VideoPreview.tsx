'use client';

import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import type { CropParams, TrimParams } from '../types/editor.types';

type VideoPreviewProps = {
  videoUrl: string | null;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  volume: number;
  playbackSpeed: number;
  rotation: number;
  crop: CropParams | null;
  trim: TrimParams | null;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
};

export function VideoPreview({
  videoUrl,
  currentTime,
  duration,
  isPlaying,
  volume,
  playbackSpeed,
  rotation,
  crop,
  trim,
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

  // Sync playback speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Calculate transform styles
  const getTransformStyle = () => {
    const transformParts: string[] = [];

    // Rotation
    if (rotation !== 0) {
      transformParts.push(`rotate(${rotation}deg)`);
    }

    // Crop (Simulation via scaling)
    if (crop) {
      const { width, height, x, y } = crop;
      if (width > 0 && height > 0) {
        const scaleX = 1 / width;
        const scaleY = 1 / height;
        // Center of the crop area in normalized coordinates
        const cropCenterX = x + width / 2;
        const cropCenterY = y + height / 2;

        // Translate to move crop center to view center (0.5, 0.5)
        const translateX = (0.5 - cropCenterX) * 100;
        const translateY = (0.5 - cropCenterY) * 100;

        transformParts.push(`scale(${scaleX}, ${scaleY})`);
        transformParts.push(`translate(${translateX}%, ${translateY}%)`);
      }
    }

    return {
      transform: transformParts.join(' '),
      transition: 'transform 0.3s ease-out',
      transformOrigin: 'center center',
    };
  };

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
      <div className="flex size-full items-center justify-center rounded-lg bg-gray-900">
        <p className="text-gray-400">No video loaded</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Video Player */}
      <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
        <video
          ref={videoRef}
          className="size-full object-contain"
          onClick={() => (isPlaying ? onPause() : onPlay())}
          style={getTransformStyle()}
        >
          <track kind="captions" />
        </video>

        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <div
            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20"
            onClick={onPlay}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onPlay();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className="rounded-full bg-white/90 p-4 transition-colors hover:bg-white">
              <Play className="size-12 text-gray-900" fill="currentColor" />
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-2">
        {/* Timeline */}
        <div
          className="relative h-2 cursor-pointer rounded-full bg-gray-200 transition-all hover:h-3"
          onClick={handleTimelineClick}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') {
              onSeek(Math.min(duration, currentTime + 5));
            } else if (e.key === 'ArrowLeft') {
              onSeek(Math.max(0, currentTime - 5));
            }
          }}
          role="slider"
          aria-valuenow={currentTime}
          aria-valuemin={0}
          aria-valuemax={duration}
          tabIndex={0}
        >
          {/* Trim Indicators - Grayed out areas */}
          {trim && (
            <>
              {/* Pre-trim area */}
              <div
                className="pointer-events-none absolute left-0 top-0 z-10 h-full rounded-l-full bg-black/30"
                style={{ width: `${(trim.start / duration) * 100}%` }}
              />
              {/* Post-trim area */}
              <div
                className="pointer-events-none absolute right-0 top-0 z-10 h-full rounded-r-full bg-black/30"
                style={{ width: `${((duration - trim.end) / duration) * 100}%` }}
              />
              {/* Start Marker */}
              <div
                className="pointer-events-none absolute top-0 z-20 h-full w-0.5 bg-yellow-500"
                style={{ left: `${(trim.start / duration) * 100}%` }}
              />
              {/* End Marker */}
              <div
                className="pointer-events-none absolute top-0 z-20 h-full w-0.5 bg-yellow-500"
                style={{ left: `${(trim.end / duration) * 100}%` }}
              />
            </>
          )}

          <div
            className="absolute left-0 top-0 h-full rounded-full bg-primary"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
          <div
            className="absolute top-1/2 size-4 -translate-y-1/2 rounded-full bg-primary shadow-lg"
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
              className="rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              {isPlaying
                ? (
                    <Pause className="size-5" />
                  )
                : (
                    <Play className="size-5" fill="currentColor" />
                  )}
            </button>

            {/* Time Display */}
            <div className="font-mono text-sm text-gray-600">
              {formatTime(currentTime)}
              {' '}
              /
              {formatTime(duration)}
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
              className="rounded-full p-2 transition-colors hover:bg-gray-100"
            >
              {isMuted || volume === 0
                ? (
                    <VolumeX className="size-5" />
                  )
                : (
                    <Volume2 className="size-5" />
                  )}
            </button>

            {showVolumeSlider && (
              <div className="absolute bottom-full right-0 mb-2 rounded-lg bg-white p-2 shadow-lg">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={e => onVolumeChange(Number(e.target.value))}
                  className="h-2 w-24"
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
