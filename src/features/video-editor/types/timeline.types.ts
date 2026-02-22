// NLE Timeline type definitions (Phase 1 — immutable AST for AI editing)

export type Effect =
  | { type: 'crop'; params: { aspectRatio: string; x: number; y: number; width: number; height: number } }
  | { type: 'rotate'; params: { degrees: number } }
  | { type: 'volume'; params: { level: number } };

export interface Asset {
  id: string; // UUID
  file: File; // The local file reference
  geminiUri?: string; // URI from Gemini File API after background upload
  duration: number;
  metadata: { width: number; height: number };
}

export interface Clip {
  id: string; // UUID
  assetId: string; // Reference to Asset
  trackId: string;
  timelineStart: number; // Position on the timeline (seconds)
  sourceStart: number; // In-point of the raw asset (seconds)
  duration: number; // How much of the asset to play (seconds)
  playbackRate: number; // Default: 1.0
  effects: Effect[];
}

export interface Track {
  id: string;
  type: 'video' | 'audio';
  clips: Clip[]; // Must be sorted by timelineStart
}

export interface ProjectState {
  version: number;
  assets: Record<string, Asset>;
  tracks: Track[];
}
