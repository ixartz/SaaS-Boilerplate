# Implementation Plan: AI Video Assistant

This document outlines the implementation plan for the "Cursor for Video" AI features.

## Phase 4: The Agentic AI Layer (The "Cursor" Magic)
**Goal:** Connect the interactive timeline to the AI using Gemini 1.5 and a BYOK (Bring Your Own Key) approach.

1. **BYOK Setup:** 
   - Build a settings modal for the user to input their Gemini API Key.
   - Save the key securely in `localStorage`.
   - Update `AIChatInterface.tsx` to prompt for this key if it is missing.

2. **Gemini File API Worker:** 
   - When an `Asset` is added to the Zustand store (in `video-editor`), run a background function to upload the `File` blob to the Google Gemini File API.
   - Update the Asset's `geminiUri` in the store once the upload completes and the file is in an `ACTIVE` state.

3. **Command Palette (Cmd+K):** 
   - Build a floating input component triggered by keyboard shortcuts overlaying the video player.
   - This replaces or augments the traditional chat sidebar.

4. **The Agent (Client-Side LangChain):**
   - On prompt submission, execute the AI call directly from the browser using the `@google/genai` or `@langchain/google-genai` SDK using the BYOK key.
   - **Input:** User Prompt + Current `ProjectState` JSON stringified + all relevant `geminiUri`s.
   - **System Prompt:** Instructs the AI that it is a video editor. It must watch the video, read the JSON timeline, and output a *new* JSON timeline `ProjectState` that fulfills the user's request.

5. **The Diff UI Integration:**
   - Take the AI's JSON response, parse it, and pass it to `setProposedState` in the Zustand store (built in Phase 1).
   - The Timeline UI will automatically overlay diffs (tinting deleted clips red, new clips green, modified clips blue) based on the `compareTimelines` utility.
   - Show an "Accept (Enter) / Reject (Esc)" tooltip near the Command Palette to commit or discard the AI's proposal.
