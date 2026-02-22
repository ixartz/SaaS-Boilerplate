# Implementation Plan: Video Editor Core

This document outlines the implementation plan for the core Non-Linear Editor (NLE) functionality.

## Phase 1: Core State & Architecture (Foundation)
**Goal:** Replace the legacy mutable `VideoEditorEngine` with a strict, immutable Zustand NLE state.
1. **Define Types:** Create `src/features/video-editor/types/timeline.types.ts` implementing the `ProjectState`, `Track`, `Clip`, and `Asset` interfaces defined in `ARCHITECTURE.md`.
2. **Create Zustand Store:** Create `src/features/video-editor/hooks/useTimelineStore.ts`. 
   - Implement actions: `addAsset`, `addClip`, `splitClip`, `deleteClip`, `updateClipEffects`.
   - Implement draft state handlers for AI proposals: `setProposedState`, `commitProposedState`, `clearProposedState`.
3. **Diffing Utility:** Create a pure function `compareTimelines(current: ProjectState, proposed: ProjectState)` that returns an array of diff objects (added, removed, modified) for the UI to consume later.

## Phase 2: The Interactive Timeline UI (The Editor)
**Goal:** Build a fully interactive, drag-and-drop web timeline that visualizes the Zustand state.
1. **Timeline Grid:** Build the main timeline component. Map time to pixels (e.g., 10px = 1 second) using absolute positioning inside a scrolling container.
2. **Render Tracks & Clips:** Map over `tracks` and `clips` from the Zustand store. Render clips as absolutely positioned blocks (`left: clip.timelineStart * 10px`, `width: clip.duration * 10px`).
3. **Drag and Drop (dnd-kit):** Integrate `@dnd-kit/core` to allow users to drag clips horizontally (changing `timelineStart`) and between tracks (changing `trackId`).
4. **Playhead:** Implement a global `currentTime` state and a draggable playhead (red line) that updates the global time.

## Phase 3: The Player & Export Engine
**Goal:** Connect the UI state to actual video playback and exporting via Mediabunny.
1. **Sequence Player (Canvas):** 
   - Create a React component that reads `currentTime` and the `ProjectState`.
   - Mount hidden `<video>` tags for the active assets.
   - Use a `requestAnimationFrame` loop to draw the currently active clip onto a `<canvas>` element. Handle switching between clips seamlessly based on `timelineStart` and `duration`.
2. **Mediabunny Exporter:**
   - Initialize a single Mediabunny `Output` (`WebMOutputFormat` or `Mp4OutputFormat`).
   - Sequentially loop through the timeline clips. For each clip, create an `Input`, use a `VideoSampleSink` to extract frames between `sourceStart` and `sourceStart + duration`.
   - **Crucial:** Offset the `timestamp` of each extracted sample by adding `timelineStart` (in microseconds) to match its position on the timeline before piping it to the `Output`'s `VideoSampleSource`.
