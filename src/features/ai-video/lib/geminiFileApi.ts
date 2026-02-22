/**
 * Browser-compatible Gemini File API client.
 *
 * Google's @google/generative-ai FileManager is designed for Node.js (uses fs).
 * This module replicates the upload + poll flow via raw fetch calls so it works
 * in the browser with a BYOK API key.
 *
 * Upload flow:
 *  1. POST /upload/v1beta/files  (multipart/related — JSON metadata + binary)
 *  2. Poll GET /v1beta/{file.name} every 2 s until state === "ACTIVE"
 */

const BASE = 'https://generativelanguage.googleapis.com';

export type GeminiFileState = 'PROCESSING' | 'ACTIVE' | 'FAILED';

export type GeminiFile = {
  name: string;        // e.g. "files/abc123"
  displayName: string;
  mimeType: string;
  uri: string;         // the URI to pass to the model
  state: GeminiFileState;
};

/** Build a multipart/related body (binary-safe — no base64). */
async function buildMultipartBody(
  file: File,
  boundary: string,
): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const meta = JSON.stringify({ file: { display_name: file.name, mime_type: file.type } });

  const part1 = enc.encode(
    `--${boundary}\r\nContent-Type: application/json; charset=utf-8\r\n\r\n${meta}\r\n`,
  );
  const part2Head = enc.encode(`--${boundary}\r\nContent-Type: ${file.type}\r\n\r\n`);
  const part2Body = new Uint8Array(await file.arrayBuffer());
  const closing = enc.encode(`\r\n--${boundary}--`);

  const out = new Uint8Array(
    part1.length + part2Head.length + part2Body.length + closing.length,
  );
  let pos = 0;
  out.set(part1, pos); pos += part1.length;
  out.set(part2Head, pos); pos += part2Head.length;
  out.set(part2Body, pos); pos += part2Body.length;
  out.set(closing, pos);
  return out;
}

/**
 * Upload a browser File to the Gemini File API, then poll until ACTIVE.
 * Returns the GeminiFile object (including `uri` to pass to the model).
 */
export async function uploadFileToGemini(
  file: File,
  apiKey: string,
  onPhase?: (phase: 'uploading' | 'processing') => void,
): Promise<GeminiFile> {
  onPhase?.('uploading');

  const boundary = `vidoflip_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
  const body = await buildMultipartBody(file, boundary);

  const uploadRes = await fetch(
    `${BASE}/upload/v1beta/files?key=${encodeURIComponent(apiKey)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/related; boundary=${boundary}`,
        'X-Goog-Upload-Protocol': 'multipart',
      },
      body,
    },
  );

  if (!uploadRes.ok) {
    const text = await uploadRes.text().catch(() => uploadRes.statusText);
    throw new Error(`Gemini file upload failed (${uploadRes.status}): ${text}`);
  }

  const uploadData = await uploadRes.json() as { file: GeminiFile };
  const fileName = uploadData.file.name; // e.g. "files/abc123"

  onPhase?.('processing');

  // Poll until ACTIVE or FAILED (max ~5 minutes at 3 s intervals)
  const MAX_POLLS = 100;
  for (let i = 0; i < MAX_POLLS; i++) {
    await new Promise(r => setTimeout(r, 3000));

    const pollRes = await fetch(
      `${BASE}/v1beta/${fileName}?key=${encodeURIComponent(apiKey)}`,
    );
    if (!pollRes.ok) continue;

    const fileData = await pollRes.json() as GeminiFile;
    if (fileData.state === 'ACTIVE') return fileData;
    if (fileData.state === 'FAILED') {
      throw new Error(`Gemini file processing failed for "${file.name}".`);
    }
  }

  throw new Error(`Gemini file "${file.name}" did not become ACTIVE within timeout.`);
}
