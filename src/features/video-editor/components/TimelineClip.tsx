'use client';

import { useDraggable } from '@dnd-kit/core';

import type { ClipDiffStatus } from '../lib/compareTimelines';
import type { Clip } from '../types/timeline.types';

type TimelineClipProps = {
  clip: Clip;
  trackId: string;
  pxPerSec: number;
  label: string;
  diffStatus?: ClipDiffStatus;
  isGhost?: boolean;
};

const DIFF_STYLES: Record<ClipDiffStatus, string> = {
  added: 'bg-green-700 border-green-400',
  removed: 'bg-red-900 border-red-500 opacity-60',
  modified: 'bg-blue-700 border-blue-400',
  unchanged: 'bg-indigo-700 border-indigo-500',
};

export function TimelineClip({
  clip,
  trackId,
  pxPerSec,
  label,
  diffStatus = 'unchanged',
  isGhost = false,
}: TimelineClipProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: clip.id,
    data: { clip, trackId },
    disabled: isGhost,
  });

  const translateX = transform?.x ?? 0;
  const left = clip.timelineStart * pxPerSec;
  const width = Math.max(clip.duration * pxPerSec, 4); // minimum 4px

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`absolute top-1 flex h-10 cursor-grab items-center overflow-hidden rounded border text-xs font-medium text-white
        ${DIFF_STYLES[diffStatus]}
        ${isDragging ? 'z-50 opacity-80 cursor-grabbing ring-2 ring-white/50' : 'z-10'}
        ${isGhost ? 'pointer-events-none' : ''}
      `}
      style={{
        left,
        width,
        transform: `translateX(${translateX}px)`,
      }}
      title={`${label} — ${clip.timelineStart.toFixed(1)}s → ${(clip.timelineStart + clip.duration).toFixed(1)}s`}
    >
      <span className="truncate px-1.5">{label}</span>
      {diffStatus !== 'unchanged' && (
        <span className="ml-auto mr-1 flex-shrink-0 rounded-sm bg-black/30 px-1 text-[9px] uppercase">
          {diffStatus}
        </span>
      )}
    </div>
  );
}
