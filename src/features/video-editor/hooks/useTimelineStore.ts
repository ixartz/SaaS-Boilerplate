import { create } from 'zustand';

import type { Asset, Clip, Effect, ProjectState, Track } from '../types/timeline.types';

// Utility: generate a UUID (browser-native)
function uuid(): string {
  return crypto.randomUUID();
}

// Utility: re-sort clips in a track by timelineStart
function sortedClips(clips: Clip[]): Clip[] {
  return [...clips].sort((a, b) => a.timelineStart - b.timelineStart);
}

type TimelineStore = {
  // ── Current state ──────────────────────────────────────────────────────────
  current: ProjectState;

  // ── Proposed (AI draft) state ──────────────────────────────────────────────
  proposed: ProjectState | null;

  // ── Playhead ───────────────────────────────────────────────────────────────
  currentTime: number;
  setCurrentTime: (t: number) => void;

  // ── Actions ────────────────────────────────────────────────────────────────
  addAsset: (asset: Omit<Asset, 'id'>) => string;
  addClip: (clip: Omit<Clip, 'id'>) => string;
  splitClip: (clipId: string, splitAtSeconds: number) => void;
  deleteClip: (clipId: string) => void;
  updateClipEffects: (clipId: string, effects: Effect[]) => void;
  moveClip: (clipId: string, newTrackId: string, newTimelineStart: number) => void;
  updateAssetGeminiUri: (assetId: string, geminiUri: string) => void;

  // ── AI draft handlers ──────────────────────────────────────────────────────
  setProposedState: (proposed: ProjectState) => void;
  commitProposedState: () => void;
  clearProposedState: () => void;
};

const INITIAL_STATE: ProjectState = {
  version: 1,
  assets: {},
  tracks: [],
};

export const useTimelineStore = create<TimelineStore>((set, get) => ({
  current: INITIAL_STATE,
  proposed: null,
  currentTime: 0,

  // ── setCurrentTime ─────────────────────────────────────────────────────────
  setCurrentTime(t) {
    set({ currentTime: Math.max(0, t) });
  },

  // ── addAsset ───────────────────────────────────────────────────────────────
  addAsset(assetData) {
    const id = uuid();
    const asset: Asset = { ...assetData, id };
    set(state => ({
      current: {
        ...state.current,
        assets: { ...state.current.assets, [id]: asset },
      },
    }));
    return id;
  },

  // ── addClip ────────────────────────────────────────────────────────────────
  addClip(clipData) {
    const id = uuid();
    const clip: Clip = { ...clipData, id };
    set((state) => {
      const tracks = state.current.tracks.map((track) => {
        if (track.id !== clip.trackId) return track;
        return { ...track, clips: sortedClips([...track.clips, clip]) };
      });

      // If the target track doesn't exist yet, create it automatically
      const trackExists = state.current.tracks.some(t => t.id === clip.trackId);
      if (!trackExists) {
        const newTrack: Track = {
          id: clip.trackId,
          type: 'video',
          clips: [clip],
        };
        return {
          current: { ...state.current, tracks: [...state.current.tracks, newTrack] },
        };
      }

      return { current: { ...state.current, tracks } };
    });
    return id;
  },

  // ── splitClip ──────────────────────────────────────────────────────────────
  splitClip(clipId, splitAtSeconds) {
    set((state) => {
      const tracks = state.current.tracks.map((track) => {
        const clipIdx = track.clips.findIndex(c => c.id === clipId);
        if (clipIdx === -1) return track;

        const original = track.clips[clipIdx]!;
        const relativeTime = splitAtSeconds - original.timelineStart;

        // Guard: split point must be inside the clip
        if (relativeTime <= 0 || relativeTime >= original.duration) return track;

        const left: Clip = {
          ...original,
          duration: relativeTime,
        };
        const right: Clip = {
          ...original,
          id: uuid(),
          timelineStart: original.timelineStart + relativeTime,
          sourceStart: original.sourceStart + relativeTime,
          duration: original.duration - relativeTime,
        };

        const newClips = [
          ...track.clips.slice(0, clipIdx),
          left,
          right,
          ...track.clips.slice(clipIdx + 1),
        ];

        return { ...track, clips: sortedClips(newClips) };
      });

      return { current: { ...state.current, tracks } };
    });
  },

  // ── deleteClip ─────────────────────────────────────────────────────────────
  deleteClip(clipId) {
    set((state) => {
      const tracks = state.current.tracks.map(track => ({
        ...track,
        clips: track.clips.filter(c => c.id !== clipId),
      }));
      return { current: { ...state.current, tracks } };
    });
  },

  // ── updateClipEffects ──────────────────────────────────────────────────────
  updateClipEffects(clipId, effects) {
    set((state) => {
      const tracks = state.current.tracks.map(track => ({
        ...track,
        clips: track.clips.map(clip =>
          clip.id === clipId ? { ...clip, effects } : clip,
        ),
      }));
      return { current: { ...state.current, tracks } };
    });
  },

  // ── moveClip ───────────────────────────────────────────────────────────────
  moveClip(clipId, newTrackId, newTimelineStart) {
    set((state) => {
      let movedClip: Clip | null = null;

      // Remove clip from its current track
      const tracks = state.current.tracks.map((track) => {
        const clip = track.clips.find(c => c.id === clipId);
        if (!clip) return track;
        movedClip = { ...clip, trackId: newTrackId, timelineStart: Math.max(0, newTimelineStart) };
        return { ...track, clips: track.clips.filter(c => c.id !== clipId) };
      });

      if (!movedClip) return state;
      const finalClip = movedClip as Clip;

      // Insert into target track (create if it doesn't exist)
      const targetExists = tracks.some(t => t.id === newTrackId);
      const updatedTracks = targetExists
        ? tracks.map((track) => {
            if (track.id !== newTrackId) return track;
            return { ...track, clips: sortedClips([...track.clips, finalClip]) };
          })
        : [...tracks, { id: newTrackId, type: 'video' as const, clips: [finalClip] }];

      return { current: { ...state.current, tracks: updatedTracks } };
    });
  },

  // ── updateAssetGeminiUri ───────────────────────────────────────────────────
  updateAssetGeminiUri(assetId, geminiUri) {
    set((state) => {
      const asset = state.current.assets[assetId];
      if (!asset) return state;
      return {
        current: {
          ...state.current,
          assets: {
            ...state.current.assets,
            [assetId]: { ...asset, geminiUri },
          },
        },
      };
    });
  },

  // ── setProposedState ───────────────────────────────────────────────────────
  setProposedState(proposed) {
    set({ proposed });
  },

  // ── commitProposedState ────────────────────────────────────────────────────
  commitProposedState() {
    const { proposed } = get();
    if (!proposed) return;
    set({
      current: { ...proposed, version: proposed.version + 1 },
      proposed: null,
    });
  },

  // ── clearProposedState ─────────────────────────────────────────────────────
  clearProposedState() {
    set({ proposed: null });
  },
}));
