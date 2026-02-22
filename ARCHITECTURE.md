# System Architecture: "Cursor for Video" Editor

## 1. System Overview
This project transforms a standard browser-based video editor into an agentic, AI-first Non-Linear Editor (NLE). The goal is to provide a "Cursor-like" experience for video: users can manually edit a drag-and-drop timeline, or they can prompt an AI (Gemini 1.5 Pro/Flash) via a Command Palette (Cmd+K) to perform complex edits. The AI proposes changes as a "Diff" on the timeline, which the user can accept or reject.

## 2. Core Architectural Pillars

### 2.1 The Timeline State Layer (Immutable JSON)
The core of the application is an immutable JSON tree representing the timeline, managed by **Zustand**. This replaces any mutable singleton editor engine.
- **Why:** LLMs are excellent at reading and outputting JSON. By representing the video as a JSON AST (Abstract Syntax Tree), the AI isn't "clicking tools"; it is mutating a document.
- **Diffing:** React compares the `current` Zustand state with the `proposed` AI state to visually highlight additions (green), deletions (red), and modifications (blue) on the timeline UI.

### 2.2 The Video Understanding Layer (BYOK AI)
The AI must "see" the video to make context-aware edits (e.g., "Cut to where the dog jumps").
- **Implementation:** Bring Your Own Key (BYOK) model. The user inputs their Google Gemini API key (stored in `localStorage`).
- **File API:** Uploaded videos are pushed to the Gemini File API in the background to get a `geminiUri`. The agent passes this URI alongside the prompt and Timeline JSON so the multimodal model can analyze the actual video frames alongside the timeline state.

### 2.3 The Rendering Engine (Browser-Native)
- **Preview (Canvas Orchestrator):** A custom React component orchestrates hidden `<video>` tags and uses `requestAnimationFrame` to draw the active clip onto an HTML5 `<canvas>`. This allows seamless playback of multiple fragmented clips and tracks.
- **Export (Mediabunny):** We use `mediabunny` (WebCodecs wrapper). Instead of building complex FFmpeg string commands, the exporter iterates through the Zustand timeline, uses `VideoSampleSink` to read frames from the source files, adjusts their timestamps based on the timeline position, and pipes them into a single `VideoSampleSource` output.

## 3. Data Structures (The AST)

The strict TypeScript schema that the AI will read and mutate:

```typescript
export interface ProjectState {
  version: number;
  assets: Record<string, Asset>;
  tracks: Track[];
}

export interface Asset {
  id: string; // UUID
  file: File; // The local file reference
  geminiUri?: string; // URI from Gemini File API after background upload
  duration: number;
  metadata: { width: number; height: number };
}

export interface Track {
  id: string;
  type: 'video' | 'audio';
  clips: Clip[]; // Must be sorted by timelineStart
}

export interface Clip {
  id: string; // UUID
  assetId: string; // Reference to Asset
  trackId: string;
  timelineStart: number; // Position on the timeline (seconds)
  sourceStart: number;   // In-point of the raw asset (seconds)
  duration: number;      // How much of the asset to play (seconds)
  playbackRate: number;  // Default: 1.0
  effects: Effect[];     // e.g., crop, volume, rotation
}

export type Effect = 
  | { type: 'crop'; params: { aspectRatio: string; x: number; y: number; width: number; height: number } }
  | { type: 'rotate'; params: { degrees: number } }
  | { type: 'volume'; params: { level: number } };
```
