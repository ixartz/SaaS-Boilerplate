'use client';

import { useDroppable } from '@dnd-kit/core';

import type { ClipDiffStatus } from '../lib/compareTimelines';
import type { Clip, Track } from '../types/timeline.types';
import { TimelineClip } from './TimelineClip';

type TimelineTrackProps = {
  track: Track;
  trackIndex: number;
  assetNames: Record<string, string>; // assetId → file name
  ghostClips: Clip[]; // clips marked as "removed" in diff
  diffMap: Map<string, ClipDiffStatus>;
  labelWidth: number;
  pxPerSec: number;
};

export function TimelineTrack({
  track,
  trackIndex,
  assetNames,
  ghostClips,
  diffMap,
  labelWidth,
  pxPerSec,
}: TimelineTrackProps) {
  const { setNodeRef, isOver } = useDroppable({ id: track.id });

  const trackLabel = `${track.type === 'video' ? 'V' : 'A'}${trackIndex + 1}`;

  return (
    <div className="flex h-12 border-b border-gray-700">
      {/* Track label */}
      <div
        className="flex flex-shrink-0 items-center justify-center border-r border-gray-700 bg-gray-800 text-xs font-semibold text-gray-400"
        style={{ width: labelWidth }}
      >
        {trackLabel}
      </div>

      {/* Clips drop zone */}
      <div
        ref={setNodeRef}
        className={`relative flex-1 transition-colors ${isOver ? 'bg-gray-600/30' : 'bg-gray-700/20'}`}
      >
        {/* Normal (or proposed) clips */}
        {track.clips.map(clip => (
          <TimelineClip
            key={clip.id}
            clip={clip}
            trackId={track.id}
            pxPerSec={pxPerSec}
            label={assetNames[clip.assetId] ?? clip.assetId.slice(0, 8)}
            diffStatus={diffMap.get(clip.id) ?? 'unchanged'}
          />
        ))}

        {/* Ghost clips (removed in proposed state) */}
        {ghostClips.map(clip => (
          <TimelineClip
            key={`ghost-${clip.id}`}
            clip={clip}
            trackId={track.id}
            pxPerSec={pxPerSec}
            label={assetNames[clip.assetId] ?? clip.assetId.slice(0, 8)}
            diffStatus="removed"
            isGhost
          />
        ))}
      </div>
    </div>
  );
}
