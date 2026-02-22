'use client';

import { Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useTimelineStore } from '../hooks/useTimelineStore';
import type { Clip } from '../types/timeline.types';

const SEEK_TOLERANCE_S = 0.1; // only force-seek if drift exceeds 100 ms

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function findActiveClip(clips: Clip[], time: number): Clip | undefined {
  return clips.find(c => time >= c.timelineStart && time < c.timelineStart + c.duration);
}

export function SequencePlayer() {
  const { current, currentTime, setCurrentTime } = useTimelineStore();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRefs = useRef(new Map<string, HTMLVideoElement>());
  const rAFRef = useRef<number | null>(null);
  const localTimeRef = useRef(0);
  const lastWallRef = useRef<number | null>(null);
  // Tracks which asset's <video> is currently .play()-ing for audio output
  const activeAssetIdRef = useRef<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // ── Derived: all video clips sorted by timelineStart ─────────────────────
  const videoClips = useMemo(
    () =>
      current.tracks
        .filter(t => t.type === 'video')
        .flatMap(t => t.clips)
        .sort((a, b) => a.timelineStart - b.timelineStart),
    [current.tracks],
  );

  const totalDuration = useMemo(
    () => videoClips.reduce((max, c) => Math.max(max, c.timelineStart + c.duration), 0),
    [videoClips],
  );

  const firstAsset = current.assets[videoClips[0]?.assetId ?? ''];
  const canvasW = firstAsset?.metadata.width ?? 1280;
  const canvasH = firstAsset?.metadata.height ?? 720;

  // ── Manage hidden <video> elements (one per asset) ───────────────────────
  useEffect(() => {
    const knownIds = new Set(Object.keys(current.assets));

    // Remove stale video elements
    for (const [id, vid] of videoRefs.current) {
      if (!knownIds.has(id)) {
        const blobSrc = vid.src;
        vid.pause();
        vid.src = '';
        try { URL.revokeObjectURL(blobSrc); } catch { /* ignore */ }
        videoRefs.current.delete(id);
        if (activeAssetIdRef.current === id) activeAssetIdRef.current = null;
      }
    }

    // Create new video elements for new assets
    for (const [id, asset] of Object.entries(current.assets)) {
      if (!videoRefs.current.has(id)) {
        const vid = document.createElement('video');
        // NOT muted — audio must pass through during playback
        vid.playsInline = true;
        vid.preload = 'auto';
        vid.src = URL.createObjectURL(asset.file);
        videoRefs.current.set(id, vid);
      }
    }
  }, [current.assets]);

  // Clean up all blob URLs on unmount
  useEffect(() => {
    return () => {
      for (const [, vid] of videoRefs.current) {
        vid.pause();
        try { URL.revokeObjectURL(vid.src); } catch { /* ignore */ }
        vid.src = '';
      }
      videoRefs.current.clear();
    };
  }, []);

  // ── Audio helpers ─────────────────────────────────────────────────────────

  /** Pause every video element and clear the active-audio tracking ref. */
  const pauseAllVideos = useCallback(() => {
    for (const vid of videoRefs.current.values()) {
      vid.pause();
    }
    activeAssetIdRef.current = null;
  }, []);

  /**
   * Seek an asset's video to `sourceTime` and start playing it (with audio).
   * Pauses any previously active video first.
   */
  const startVideo = useCallback((assetId: string, sourceTime: number) => {
    if (activeAssetIdRef.current && activeAssetIdRef.current !== assetId) {
      videoRefs.current.get(activeAssetIdRef.current)?.pause();
    }
    const vid = videoRefs.current.get(assetId);
    if (!vid) return;

    // Apply volume effect before playing
    // (volume effect is also applied in drawFrame for accuracy, this handles initial state)
    const clips = videoClips; // closure captures current value via loopDataRef
    const clip = clips.find(c => c.assetId === assetId);
    if (clip) {
      const volEff = clip.effects.find(e => e.type === 'volume');
      vid.volume = volEff && volEff.type === 'volume'
        ? Math.max(0, Math.min(1, volEff.params.level / 100))
        : 1;
    }

    vid.currentTime = sourceTime;
    vid.play().catch(err => console.warn('[SequencePlayer] play() blocked:', err));
    activeAssetIdRef.current = assetId;
  }, [videoClips]);

  // ── Draw a single frame onto the canvas ──────────────────────────────────
  const drawFrame = useCallback(
    (time: number, clips: Clip[]) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      const clip = findActiveClip(clips, time);

      if (!clip) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      const vid = videoRefs.current.get(clip.assetId);
      if (!vid || vid.readyState < 2) return;

      // Apply volume effect
      const volEff = clip.effects.find(e => e.type === 'volume');
      if (volEff && volEff.type === 'volume') {
        vid.volume = Math.max(0, Math.min(1, volEff.params.level / 100));
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      // Apply rotation effect
      const rotEff = clip.effects.find(e => e.type === 'rotate');
      if (rotEff && rotEff.type === 'rotate') {
        const rad = (rotEff.params.degrees * Math.PI) / 180;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rad);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
      }

      // Apply crop effect or draw full frame
      const cropEff = clip.effects.find(e => e.type === 'crop');
      if (cropEff && cropEff.type === 'crop') {
        const { x, y, width, height } = cropEff.params;
        ctx.drawImage(
          vid,
          x * vid.videoWidth,
          y * vid.videoHeight,
          width * vid.videoWidth,
          height * vid.videoHeight,
          0,
          0,
          canvas.width,
          canvas.height,
        );
      } else {
        ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
      }

      ctx.restore();
    },
    [],
  );

  // ── Live-update ref so the stable rAF tick always sees fresh values ───────
  const loopDataRef = useRef({ videoClips, totalDuration, drawFrame, setCurrentTime, setIsPlaying, startVideo, pauseAllVideos });
  useEffect(() => {
    loopDataRef.current = { videoClips, totalDuration, drawFrame, setCurrentTime, setIsPlaying, startVideo, pauseAllVideos };
  });

  // ── requestAnimationFrame playback loop ───────────────────────────────────
  const tick = useCallback((wallClock: number) => {
    const {
      videoClips: clips,
      totalDuration: total,
      drawFrame: draw,
      setCurrentTime: setT,
      startVideo: startVid,
      pauseAllVideos: pauseAll,
    } = loopDataRef.current;

    if (lastWallRef.current !== null) {
      const delta = (wallClock - lastWallRef.current) / 1000;
      localTimeRef.current = Math.min(localTimeRef.current + delta, total);

      if (localTimeRef.current >= total) {
        const endTime = total;
        draw(endTime, clips);
        setT(endTime);
        pauseAll();
        setIsPlaying(false);
        return;
      }

      const t = localTimeRef.current;
      const clip = findActiveClip(clips, t);

      if (clip) {
        const vid = videoRefs.current.get(clip.assetId);
        if (vid) {
          const expected = clip.sourceStart + (t - clip.timelineStart);

          // Switch audio to new clip when the active asset changes
          if (activeAssetIdRef.current !== clip.assetId) {
            startVid(clip.assetId, expected);
          } else if (Math.abs(vid.currentTime - expected) > SEEK_TOLERANCE_S) {
            // Correct drift — seek video; browser re-syncs audio automatically
            vid.currentTime = expected;
          }
        }
      }

      draw(t, clips);
      setT(t);
    }

    lastWallRef.current = wallClock;
    rAFRef.current = requestAnimationFrame(tick);
  }, []); // intentionally stable — reads loopDataRef every frame

  // Start / stop the rAF loop and audio when isPlaying changes
  useEffect(() => {
    if (isPlaying) {
      const t = currentTime;
      localTimeRef.current = t;
      lastWallRef.current = null;

      // Start audio on the initially active clip
      const clip = findActiveClip(videoClips, t);
      if (clip) {
        const expected = clip.sourceStart + (t - clip.timelineStart);
        startVideo(clip.assetId, expected);
      }

      rAFRef.current = requestAnimationFrame(tick);
    } else {
      if (rAFRef.current !== null) {
        cancelAnimationFrame(rAFRef.current);
        rAFRef.current = null;
      }
      pauseAllVideos();
    }
    return () => {
      if (rAFRef.current !== null) {
        cancelAnimationFrame(rAFRef.current);
        rAFRef.current = null;
      }
    };
  }, [isPlaying]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Static seek: redraw when currentTime changes externally (scrubbing) ───
  useEffect(() => {
    if (isPlaying) return undefined;

    const clip = findActiveClip(videoClips, currentTime);
    if (clip) {
      const vid = videoRefs.current.get(clip.assetId);
      if (vid) {
        const sourceTime = clip.sourceStart + (currentTime - clip.timelineStart);
        vid.currentTime = sourceTime;
        const onSeeked = () => drawFrame(currentTime, videoClips);
        vid.addEventListener('seeked', onSeeked, { once: true });
        return () => vid.removeEventListener('seeked', onSeeked);
      }
    } else {
      drawFrame(currentTime, videoClips);
    }
    return undefined;
  }, [currentTime, isPlaying, videoClips, drawFrame]);

  if (videoClips.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={canvasW}
        height={canvasH}
        className="max-h-64 w-full max-w-3xl rounded-lg bg-black object-contain shadow-lg"
      />

      {/* Playback controls */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setIsPlaying(p => !p)}
          className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow hover:bg-gray-100"
        >
          {isPlaying
            ? <Pause className="size-4" />
            : <Play className="size-4" />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <span className="font-mono text-sm text-gray-500">
          {formatTime(currentTime)}
          {' / '}
          {formatTime(totalDuration)}
        </span>
      </div>
    </div>
  );
}
