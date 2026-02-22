/**
 * Client-side AI agent for NLE timeline editing.
 *
 * Uses @langchain/google-genai with a BYOK Gemini API key to:
 *  1. Serialize the current ProjectState (stripping non-serializable File objects)
 *  2. Pass the JSON + geminiUris to Gemini 1.5 Flash as a multimodal message
 *  3. Parse the response back into a full ProjectState (restoring File refs)
 *  4. Return the proposed ProjectState for setProposedState()
 */

import type { Asset, Clip, ProjectState, Track } from '@/features/video-editor/types/timeline.types';

// ── System prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a professional video editor AI inside VidoFlip, a browser-based Non-Linear Editor (NLE).

You receive:
1. The current timeline as a JSON "ProjectState" object (tracks → clips; assets contain metadata but no raw binary)
2. One or more videos uploaded to the Gemini File API — watch them to understand the content
3. A user editing request

Your job:
- Analyse the video(s) if the request requires understanding the content (e.g. "cut the part where the speaker pauses")
- Read the ProjectState JSON carefully
- Return a MODIFIED ProjectState JSON that implements the user's request

Rules:
- Keep existing assetIds — never invent new asset IDs (assets map to files the user already has)
- Keep clipIds unchanged for clips you don't modify
- For brand-new clips (e.g. splits or duplicates), use a new random UUID string
- All timestamps are in SECONDS (floats); use precision up to 3 decimal places
- playbackRate: 1.0 = normal, 2.0 = 2× speed, 0.5 = half speed
- effects array: only include effects that apply to the clip
- Increment "version" by 1
- Output ONLY the raw JSON — no markdown fences, no explanation, no trailing text
- The JSON must be parseable by JSON.parse() without preprocessing`;

// ── Serialisation helpers ────────────────────────────────────────────────────

type SerializedAsset = Omit<Asset, 'file'>;

function serializeState(state: ProjectState): object {
  const assets: Record<string, SerializedAsset> = {};
  for (const [id, asset] of Object.entries(state.assets)) {
    const { file: _file, ...rest } = asset;
    assets[id] = rest;
  }
  return { ...state, assets };
}

function restoreState(raw: unknown, original: ProjectState): ProjectState {
  if (typeof raw !== 'object' || raw === null) {
    throw new TypeError('AI response is not a JSON object.');
  }

  const obj = raw as Record<string, unknown>;

  // Restore File references from the original assets (AI cannot return File objects)
  const rawAssets = (obj.assets ?? {}) as Record<string, Partial<SerializedAsset>>;
  const assets: Record<string, Asset> = {};
  for (const [id, partial] of Object.entries(rawAssets)) {
    const existing = original.assets[id];
    if (!existing) continue; // AI cannot invent new asset files; skip unknowns
    assets[id] = { ...existing, ...partial, file: existing.file };
  }

  return {
    version: typeof obj.version === 'number' ? obj.version : original.version + 1,
    assets,
    tracks: validateTracks(obj.tracks, original),
  };
}

function validateTracks(raw: unknown, original: ProjectState): Track[] {
  if (!Array.isArray(raw)) return original.tracks;

  return raw.map((t): Track => ({
    id: String(t.id ?? crypto.randomUUID()),
    type: t.type === 'audio' ? 'audio' : 'video',
    clips: Array.isArray(t.clips) ? t.clips.map(validateClip) : [],
  }));
}

function validateClip(raw: unknown): Clip {
  const c = raw as Record<string, unknown>;
  return {
    id: String(c.id ?? crypto.randomUUID()),
    assetId: String(c.assetId ?? ''),
    trackId: String(c.trackId ?? ''),
    timelineStart: Number(c.timelineStart ?? 0),
    sourceStart: Number(c.sourceStart ?? 0),
    duration: Number(c.duration ?? 0),
    playbackRate: Number(c.playbackRate ?? 1),
    effects: Array.isArray(c.effects) ? (c.effects as Clip['effects']) : [],
  };
}

function extractJSON(text: string): string {
  // Strip markdown code fences if present
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced?.[1]) return fenced[1].trim();
  // Strip any leading/trailing non-JSON prose
  const jsonStart = text.indexOf('{');
  const jsonEnd = text.lastIndexOf('}');
  if (jsonStart !== -1 && jsonEnd !== -1) return text.slice(jsonStart, jsonEnd + 1);
  return text.trim();
}

// ── Agent call ───────────────────────────────────────────────────────────────

export type AgentCallArgs = {
  prompt: string;
  state: ProjectState;
  geminiKey: string;
};

export async function callTimelineAgent({
  prompt,
  state,
  geminiKey,
}: AgentCallArgs): Promise<ProjectState> {
  const { ChatGoogleGenerativeAI } = await import('@langchain/google-genai');
  const { HumanMessage, SystemMessage } = await import('@langchain/core/messages');

  const llm = new ChatGoogleGenerativeAI({
    model: 'gemini-2.5-flash',
    apiKey: geminiKey,
    maxOutputTokens: 8192,
    temperature: 0.1, // deterministic for JSON output
  });

  // Collect geminiUris for all assets that have been uploaded
  const geminiUris = Object.values(state.assets)
    .map(a => a.geminiUri)
    .filter((uri): uri is string => typeof uri === 'string' && uri.length > 0);

  // Build multimodal message content
  type ContentPart =
    | { type: 'text'; text: string }
    | { type: 'media'; mimeType: string; fileUri: string };

  const content: ContentPart[] = [];

  // Attach each video via its Gemini File URI
  for (const uri of geminiUris) {
    content.push({ type: 'media', mimeType: 'video/mp4', fileUri: uri });
  }

  content.push({
    type: 'text',
    text: [
      `Current timeline (JSON):`,
      JSON.stringify(serializeState(state), null, 2),
      ``,
      `User request: ${prompt}`,
    ].join('\n'),
  });

  const messages = [
    new SystemMessage(SYSTEM_PROMPT),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new HumanMessage({ content: content as any }),
  ];

  const response = await llm.invoke(messages);

  // Extract text from the response
  const rawText =
    typeof response.content === 'string'
      ? response.content
      : Array.isArray(response.content)
        ? response.content
            .filter((p): p is { type: 'text'; text: string } => 'text' in p)
            .map(p => p.text)
            .join('')
        : JSON.stringify(response.content);

  const jsonText = extractJSON(rawText);

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error(
      `Gemini returned non-JSON output. Raw response:\n${rawText.slice(0, 500)}`,
    );
  }

  return restoreState(parsed, state);
}
