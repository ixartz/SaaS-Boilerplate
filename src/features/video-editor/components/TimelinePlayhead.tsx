'use client';

import { useCallback, useEffect, useRef } from 'react';

type TimelinePlayheadProps = {
  currentTime: number;
  totalSecs: number;
  pxPerSec: number;
  labelWidth: number;
  trackCount: number;
  onSeek: (t: number) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
};

export function TimelinePlayhead({
  currentTime,
  totalSecs,
  pxPerSec,
  labelWidth,
  trackCount,
  onSeek,
  scrollContainerRef,
}: TimelinePlayheadProps) {
  const isDragging = useRef(false);

  const timeToLeft = (t: number) => labelWidth + t * pxPerSec;

  const getTimeFromClientX = useCallback(
    (clientX: number): number => {
      const container = scrollContainerRef.current;
      if (!container) return currentTime;
      const rect = container.getBoundingClientRect();
      const scrollLeft = container.scrollLeft;
      const x = clientX - rect.left + scrollLeft - labelWidth;
      return Math.max(0, Math.min(x / pxPerSec, totalSecs));
    },
    [scrollContainerRef, labelWidth, pxPerSec, totalSecs, currentTime],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isDragging.current = true;
    },
    [],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      onSeek(getTimeFromClientX(e.clientX));
    };
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [getTimeFromClientX, onSeek]);

  const RULER_H = 24; // px — must match TimelineRuler height
  const TRACK_H = 48; // px — must match TimelineTrack height
  const totalHeight = RULER_H + trackCount * TRACK_H;
  const left = timeToLeft(currentTime);

  return (
    <div
      className="pointer-events-none absolute top-0 z-20"
      style={{ left, height: totalHeight }}
    >
      {/* Head diamond */}
      <div
        className="pointer-events-auto absolute -translate-x-1/2 cursor-col-resize"
        style={{ top: 0 }}
        onMouseDown={handleMouseDown}
      >
        <div className="h-3 w-3 rotate-45 bg-red-500" />
      </div>
      {/* Stem */}
      <div className="absolute top-3 left-1/2 w-px -translate-x-1/2 bg-red-500" style={{ height: totalHeight - 12 }} />
    </div>
  );
}
