import type { MediabunnyImport } from '@/lib/mediabunny-loader';
import { createBlobInput, createMp4Output, loadMediabunny } from '@/lib/mediabunny-loader';

import type { ProjectState } from '../types/timeline.types';

export type ExportProgress = {
  phase: 'preparing' | 'encoding' | 'finalizing';
  /** 0–100 */
  progress: number;
};

/**
 * Export the NLE timeline to a single MP4 Blob using Mediabunny.
 *
 * For each clip (sorted by timelineStart):
 *  - Open the source asset as an Input
 *  - Read VideoSamples between [sourceStart, sourceStart + duration)
 *  - Adjust each sample's timestamp:
 *      newTimestamp = sampleTimestamp - sourceStartUs + timelineOffsetUs
 *  - Pipe adjusted samples into the shared VideoSampleSource on the Output
 *  - Mirror the same logic for AudioSamples
 *
 * @param state     The current (or committed) ProjectState from useTimelineStore
 * @param onProgress  Optional callback for UI progress feedback
 */
export async function exportTimeline(
  state: ProjectState,
  onProgress?: (p: ExportProgress) => void,
): Promise<Blob> {
  // ── 1. Collect clips ──────────────────────────────────────────────────────
  const clips = state.tracks
    .filter(t => t.type === 'video')
    .flatMap(t => t.clips)
    .sort((a, b) => a.timelineStart - b.timelineStart);

  if (clips.length === 0) {
    throw new Error('No video clips in timeline — nothing to export.');
  }

  onProgress?.({ phase: 'preparing', progress: 0 });

  // ── 2. Load mediabunny ────────────────────────────────────────────────────
  const runtime: MediabunnyImport = await loadMediabunny();

  // ── 3. Create output ──────────────────────────────────────────────────────
  const { output, target, format } = createMp4Output(runtime);

  let videoSource: InstanceType<MediabunnyImport['VideoSampleSource']> | null = null;
  let audioSource: InstanceType<MediabunnyImport['AudioSampleSource']> | null = null;
  const inputs: InstanceType<MediabunnyImport['Input']>[] = [];

  try {
    // Probe first asset to confirm it exists before creating the output
    const firstAsset = state.assets[clips[0]!.assetId];
    if (!firstAsset) throw new Error('Asset not found for first clip.');

    // Set up shared video source (H.264, 4 Mbps)
    videoSource = new runtime.VideoSampleSource({ codec: 'avc', bitrate: 4_000_000 });
    output.addVideoTrack(videoSource, { frameRate: 30 });

    // Set up shared audio source (AAC, 192 kbps)
    audioSource = new runtime.AudioSampleSource({ codec: 'aac', bitrate: 192_000 });
    output.addAudioTrack(audioSource);

    await output.start();

    // ── 4. Process each clip ────────────────────────────────────────────────
    for (let i = 0; i < clips.length; i++) {
      const clip = clips[i]!;
      const asset = state.assets[clip.assetId];
      if (!asset) continue;

      onProgress?.({
        phase: 'encoding',
        progress: Math.round((i / clips.length) * 88) + 5,
      });

      const input = await createBlobInput(asset.file, runtime);
      inputs.push(input);

      const videoTracks = await input.getVideoTracks();
      if (videoTracks.length === 0) continue;

      const audioTracks = await input.getAudioTracks();

      // Timestamps in mediabunny are in microseconds (μs)
      const sourceStartUs = clip.sourceStart * 1e6;
      const sourceEndUs = (clip.sourceStart + clip.duration) * 1e6;
      const timelineOffsetUs = clip.timelineStart * 1e6;

      // Apply playbackRate to timeline offset windows if != 1
      // (samples are still read at original speed; only timestamp spacing changes)
      const rate = clip.playbackRate ?? 1;

      // ── 4a. Video samples ───────────────────────────────────────────────
      const videoSink = new runtime.VideoSampleSink(videoTracks[0]!);
      for await (const sample of videoSink.samples()) {
        if (sample.timestamp < sourceStartUs) {
          sample.close();
          continue;
        }
        if (sample.timestamp >= sourceEndUs) {
          sample.close();
          break;
        }

        const adjusted = sample.clone();
        // Offset to timeline position, adjusting for playback rate
        const relTs = (sample.timestamp - sourceStartUs) / rate;
        adjusted.setTimestamp(timelineOffsetUs + relTs);

        await videoSource!.add(adjusted);
        sample.close();
        adjusted.close();
      }

      // ── 4b. Audio samples ───────────────────────────────────────────────
      if (audioSource && audioTracks.length > 0) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const audioSink = new runtime.AudioSampleSink(audioTracks[0] as any);
          for await (const sample of audioSink.samples()) {
            if (sample.timestamp < sourceStartUs) {
              sample.close();
              continue;
            }
            if (sample.timestamp >= sourceEndUs) {
              sample.close();
              break;
            }

            const adjusted = sample.clone();
            const relTs = (sample.timestamp - sourceStartUs) / rate;
            adjusted.setTimestamp(timelineOffsetUs + relTs);

            await audioSource.add(adjusted);
            sample.close();
            adjusted.close();
          }
        } catch {
          // Not all videos have an audio track; continue silently
        }
      }
    }

    // ── 5. Finalize ───────────────────────────────────────────────────────
    videoSource?.close();
    audioSource?.close();
    videoSource = null;
    audioSource = null;

    onProgress?.({ phase: 'finalizing', progress: 95 });
    await output.finalize();

    const buffer = target.buffer;
    if (!buffer) throw new Error('Mediabunny produced no output buffer.');

    onProgress?.({ phase: 'finalizing', progress: 100 });
    return new Blob([buffer], { type: format.mimeType });
  } finally {
    // Always clean up — even on error
    try { videoSource?.close(); } catch { /* ignore */ }
    try { audioSource?.close(); } catch { /* ignore */ }
    for (const inp of inputs) {
      try { inp.dispose(); } catch { /* ignore */ }
    }
  }
}
