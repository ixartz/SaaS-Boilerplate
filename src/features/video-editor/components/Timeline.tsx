'use client';

import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { compareTimelines } from '../lib/compareTimelines';
import { useTimelineStore } from '../hooks/useTimelineStore';
import type { Clip } from '../types/timeline.types';
import { TimelinePlayhead } from './TimelinePlayhead';
import { TimelineRuler } from './TimelineRuler';
import { TimelineTrack } from './TimelineTrack';

export const PX_PER_SEC = 10;
const LABEL_WIDTH = 80;
const MIN_TIMELINE_SECS = 60;

export function Timeline() {
  const {
    current,
    proposed,
    currentTime,
    setCurrentTime,
    moveClip,
    commitProposedState,
    clearProposedState,
  } = useTimelineStore();

  const scrollRef = useRef<HTMLDivElement>(null);

  // Choose which state to display
  const activeState = proposed ?? current;

  // Diff computation (only when a proposal exists)
  const diff = useMemo(
    () => (proposed ? compareTimelines(current, proposed) : null),
    [current, proposed],
  );

  const diffMap = useMemo(
    () => new Map(diff?.clips.map(d => [d.clipId, d.status]) ?? []),
    [diff],
  );

  // Ghost clips: clips removed in the proposal, rendered in their original track
  const ghostClipsByTrack = useMemo(() => {
    if (!diff) return new Map<string, Clip[]>();
    const map = new Map<string, Clip[]>();
    for (const d of diff.clips) {
      if (d.status === 'removed' && d.current) {
        const list = map.get(d.trackId) ?? [];
        list.push(d.current);
        map.set(d.trackId, list);
      }
    }
    return map;
  }, [diff]);

  // Tracks to render: proposed tracks + any tracks that only had removed clips
  const tracksToRender = useMemo(() => {
    const tracks = [...activeState.tracks];
    if (!diff) return tracks;

    for (const d of diff.clips) {
      if (d.status !== 'removed' || !d.current) continue;
      const alreadyPresent = tracks.some(t => t.id === d.trackId);
      if (!alreadyPresent) {
        const originalTrack = current.tracks.find(t => t.id === d.trackId);
        if (originalTrack) {
          tracks.push({ ...originalTrack, clips: [] }); // ghost clips rendered separately
        }
      }
    }
    return tracks;
  }, [activeState, diff, current]);

  // Asset name lookup for clip labels
  const assetNames = useMemo(() => {
    const map: Record<string, string> = {};
    for (const [id, asset] of Object.entries(current.assets)) {
      map[id] = asset.file.name;
    }
    return map;
  }, [current.assets]);

  // Total duration for ruler
  const totalSecs = useMemo(() => {
    let max = MIN_TIMELINE_SECS;
    for (const track of tracksToRender) {
      for (const clip of track.clips) {
        max = Math.max(max, clip.timelineStart + clip.duration);
      }
    }
    // Also account for ghost clips
    for (const clips of ghostClipsByTrack.values()) {
      for (const clip of clips) {
        max = Math.max(max, clip.timelineStart + clip.duration);
      }
    }
    return max + 10;
  }, [tracksToRender, ghostClipsByTrack]);

  // dnd-kit sensors — require a small drag before activating to allow click events
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, delta, over } = event;
      const clipId = active.id as string;
      const clipData = active.data.current as { clip: Clip; trackId: string };
      const newTimelineStart = clipData.clip.timelineStart + delta.x / PX_PER_SEC;
      const newTrackId = (over?.id as string | undefined) ?? clipData.trackId;
      moveClip(clipId, newTrackId, newTimelineStart);
    },
    [moveClip],
  );

  // Click on ruler → seek
  const handleRulerClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const scrollLeft = scrollRef.current?.scrollLeft ?? 0;
      const x = e.clientX - rect.left + scrollLeft - LABEL_WIDTH;
      if (x < 0) return;
      setCurrentTime(Math.min(x / PX_PER_SEC, totalSecs));
    },
    [setCurrentTime, totalSecs],
  );

  // Keyboard shortcuts for Accept / Reject
  useEffect(() => {
    if (!proposed) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') commitProposedState();
      if (e.key === 'Escape') clearProposedState();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [proposed, commitProposedState, clearProposedState]);

  const totalWidth = LABEL_WIDTH + totalSecs * PX_PER_SEC;

  return (
    <div className="flex flex-col border-t border-gray-700 bg-gray-900 text-white">
      {/* AI proposal action bar */}
      {proposed && (
        <div className="flex items-center gap-3 border-b border-yellow-500/30 bg-yellow-900/20 px-4 py-1.5 text-sm">
          <span className="font-medium text-yellow-400">AI proposal ready</span>
          <button
            type="button"
            onClick={commitProposedState}
            className="rounded bg-green-600 px-3 py-0.5 text-xs font-medium hover:bg-green-500"
          >
            Accept
            <kbd className="ml-1 rounded bg-green-800 px-1 text-[10px]">Enter</kbd>
          </button>
          <button
            type="button"
            onClick={clearProposedState}
            className="rounded bg-red-700 px-3 py-0.5 text-xs font-medium hover:bg-red-600"
          >
            Reject
            <kbd className="ml-1 rounded bg-red-900 px-1 text-[10px]">Esc</kbd>
          </button>
          {diff && (
            <span className="ml-auto text-xs text-gray-400">
              {diff.clips.filter(d => d.status === 'added').length} added ·{' '}
              {diff.clips.filter(d => d.status === 'removed').length} removed ·{' '}
              {diff.clips.filter(d => d.status === 'modified').length} modified
            </span>
          )}
        </div>
      )}

      {/* Scrollable timeline area */}
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div ref={scrollRef} className="overflow-x-auto overflow-y-hidden">
          <div className="relative" style={{ width: totalWidth }}>
            {/* Ruler */}
            <TimelineRuler
              totalSecs={totalSecs}
              currentTime={currentTime}
              labelWidth={LABEL_WIDTH}
              pxPerSec={PX_PER_SEC}
              onClick={handleRulerClick}
            />

            {/* Empty state */}
            {tracksToRender.length === 0 && (
              <div
                className="flex items-center justify-center text-sm text-gray-500"
                style={{ height: 48 }}
              >
                Load a video to populate the timeline
              </div>
            )}

            {/* Track rows */}
            {tracksToRender.map((track, i) => (
              <TimelineTrack
                key={track.id}
                track={track}
                trackIndex={i}
                assetNames={assetNames}
                ghostClips={ghostClipsByTrack.get(track.id) ?? []}
                diffMap={diffMap}
                labelWidth={LABEL_WIDTH}
                pxPerSec={PX_PER_SEC}
              />
            ))}

            {/* Playhead */}
            <TimelinePlayhead
              currentTime={currentTime}
              totalSecs={totalSecs}
              pxPerSec={PX_PER_SEC}
              labelWidth={LABEL_WIDTH}
              trackCount={tracksToRender.length}
              onSeek={setCurrentTime}
              scrollContainerRef={scrollRef}
            />
          </div>
        </div>
      </DndContext>
    </div>
  );
}
