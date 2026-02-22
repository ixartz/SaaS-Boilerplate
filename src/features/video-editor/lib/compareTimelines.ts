import type { Clip, ProjectState } from '../types/timeline.types';

export type ClipDiffStatus = 'added' | 'removed' | 'modified' | 'unchanged';

export type ClipDiff = {
  status: ClipDiffStatus;
  clipId: string;
  trackId: string;
  current: Clip | null; // null when added
  proposed: Clip | null; // null when removed
};

export type TimelineDiff = {
  clips: ClipDiff[];
  hasChanges: boolean;
};

/**
 * Pure function that compares two ProjectState snapshots and returns a flat
 * list of per-clip diffs that the Timeline UI can use to tint clips:
 *   - added    → green
 *   - removed  → red
 *   - modified → blue
 *   - unchanged → default
 */
export function compareTimelines(
  current: ProjectState,
  proposed: ProjectState,
): TimelineDiff {
  const diffs: ClipDiff[] = [];

  // Build lookup maps: clipId → { clip, trackId }
  const currentMap = new Map<string, { clip: Clip; trackId: string }>();
  for (const track of current.tracks) {
    for (const clip of track.clips) {
      currentMap.set(clip.id, { clip, trackId: track.id });
    }
  }

  const proposedMap = new Map<string, { clip: Clip; trackId: string }>();
  for (const track of proposed.tracks) {
    for (const clip of track.clips) {
      proposedMap.set(clip.id, { clip, trackId: track.id });
    }
  }

  // Clips in proposed → added or modified
  for (const [clipId, { clip: proposedClip, trackId }] of proposedMap) {
    const currentEntry = currentMap.get(clipId);
    if (!currentEntry) {
      // New clip
      diffs.push({
        status: 'added',
        clipId,
        trackId,
        current: null,
        proposed: proposedClip,
      });
    } else {
      const status = clipsAreEqual(currentEntry.clip, proposedClip)
        ? 'unchanged'
        : 'modified';
      diffs.push({
        status,
        clipId,
        trackId,
        current: currentEntry.clip,
        proposed: proposedClip,
      });
    }
  }

  // Clips only in current → removed
  for (const [clipId, { clip: currentClip, trackId }] of currentMap) {
    if (!proposedMap.has(clipId)) {
      diffs.push({
        status: 'removed',
        clipId,
        trackId,
        current: currentClip,
        proposed: null,
      });
    }
  }

  const hasChanges = diffs.some(d => d.status !== 'unchanged');
  return { clips: diffs, hasChanges };
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function clipsAreEqual(a: Clip, b: Clip): boolean {
  return (
    a.assetId === b.assetId
    && a.trackId === b.trackId
    && a.timelineStart === b.timelineStart
    && a.sourceStart === b.sourceStart
    && a.duration === b.duration
    && a.playbackRate === b.playbackRate
    && JSON.stringify(a.effects) === JSON.stringify(b.effects)
  );
}
