// MediaBunny wrapper for video editing operations
import {
  createBlobInput,
  createMp4Output,
  loadMediabunny,
} from '@/lib/mediabunny-loader';

import type {
  CropParams,
  EditCommand,
  ExportOptions,
  FadeParams,
  RotateParams,
  SpeedParams,
  TrimParams,
  VolumeParams,
} from '../types/editor.types';

export class VideoEditorEngine {
  private videoFile: File | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private editHistory: EditCommand[] = [];

  // Current state tracking
  private currentRotation = 0;
  private currentSpeed = 1;
  private currentVolume = 1;
  private currentCrop: CropParams | null = null;
  private currentTrim: TrimParams | null = null;

  /**
   * Initialize the video editor with a video file
   */
  async initialize(file: File): Promise<void> {
    this.videoFile = file;
    this.editHistory = [];
    this.resetState();

    // Create video element for preview (internal use)
    this.videoElement = document.createElement('video');
    this.videoElement.src = URL.createObjectURL(file);
    this.videoElement.preload = 'metadata';
    this.videoElement.muted = true; // Start muted to avoid noise during init

    // Wait for metadata to load
    await new Promise<void>((resolve, reject) => {
      if (!this.videoElement) {
        reject(new Error('Video element not initialized'));
        return;
      }

      this.videoElement.onloadedmetadata = () => resolve();
      this.videoElement.onerror = () => reject(new Error('Failed to load video'));
    });
  }

  private resetState() {
    this.currentRotation = 0;
    this.currentSpeed = 1;
    this.currentVolume = 1;
    this.currentCrop = null;
    this.currentTrim = null;
  }

  /**
   * Get video metadata
   */
  getMetadata() {
    if (!this.videoElement) {
      throw new Error('Video not initialized');
    }

    return {
      duration: this.videoElement.duration,
      width: this.videoElement.videoWidth,
      height: this.videoElement.videoHeight,
      resolution: `${this.videoElement.videoWidth}x${this.videoElement.videoHeight}`,
    };
  }

  /**
   * Get video element for preview
   */
  getVideoElement(): HTMLVideoElement | null {
    return this.videoElement;
  }

  /**
   * Apply current effects to a preview video element
   */
  applyPreviewEffects(previewElement: HTMLVideoElement) {
    if (!previewElement) {
      return;
    }

    // Apply Rotation and Scale (for crop simulation)
    const transformParts: string[] = [];

    // Rotation
    if (this.currentRotation !== 0) {
      transformParts.push(`rotate(${this.currentRotation}deg)`);
    }

    // Crop (Simulation via scaling)
    if (this.currentCrop) {
      const { width, height, x, y } = this.currentCrop;
      if (width > 0 && height > 0) {
        const scaleX = 1 / width;
        const scaleY = 1 / height;
        // Center of the crop area in normalized coordinates
        const cropCenterX = x + width / 2;
        const cropCenterY = y + height / 2;

        // Translate to move crop center to view center (0.5, 0.5)
        const translateX = (0.5 - cropCenterX) * 100;
        const translateY = (0.5 - cropCenterY) * 100;

        transformParts.push(`scale(${scaleX}, ${scaleY})`);
        transformParts.push(`translate(${translateX}%, ${translateY}%)`);
      }
    }

    previewElement.style.transform = transformParts.join(' ');
    previewElement.style.transformOrigin = 'center center';
    previewElement.style.transition = 'transform 0.3s ease-out';

    // Playback Speed
    previewElement.playbackRate = this.currentSpeed;

    // Volume
    previewElement.volume = this.currentVolume;
  }

  /**
   * Trim video
   */
  async trim(params: TrimParams): Promise<void> {
    const command: EditCommand = {
      type: 'trim',
      params,
      timestamp: Date.now(),
    };
    this.editHistory.push(command);
    this.currentTrim = params;

    console.log('Trim command added:', command); // eslint-disable-line no-console
  }

  /**
   * Crop video
   */
  async crop(params: CropParams): Promise<void> {
    const command: EditCommand = {
      type: 'crop',
      params,
      timestamp: Date.now(),
    };
    this.editHistory.push(command);
    this.currentCrop = params;

    console.log('Crop command added:', command); // eslint-disable-line no-console
  }

  /**
   * Rotate video
   */
  async rotate(params: RotateParams): Promise<void> {
    const command: EditCommand = {
      type: 'rotate',
      params,
      timestamp: Date.now(),
    };
    this.editHistory.push(command);

    // Update current rotation
    this.currentRotation = (this.currentRotation + params.degrees) % 360;

    console.log('Rotate command added:', command); // eslint-disable-line no-console
  }

  /**
   * Change video speed
   */
  async changeSpeed(params: SpeedParams): Promise<void> {
    const command: EditCommand = {
      type: 'speed',
      params,
      timestamp: Date.now(),
    };
    this.editHistory.push(command);
    this.currentSpeed = params.multiplier;

    console.log('Speed command added:', command); // eslint-disable-line no-console
  }

  /**
   * Adjust volume
   */
  async adjustVolume(params: VolumeParams): Promise<void> {
    const command: EditCommand = {
      type: 'volume',
      params,
      timestamp: Date.now(),
    };
    this.editHistory.push(command);
    this.currentVolume = params.level / 100;

    console.log('Volume command added:', command); // eslint-disable-line no-console
  }

  /**
   * Add fade in effect
   */
  async fadeIn(params: FadeParams): Promise<void> {
    const command: EditCommand = {
      type: 'fadeIn',
      params,
      timestamp: Date.now(),
    };
    this.editHistory.push(command);
    // Visual preview for fade not implemented in CSS yet
    console.log('Fade in command added:', command); // eslint-disable-line no-console
  }

  /**
   * Add fade out effect
   */
  async fadeOut(params: FadeParams): Promise<void> {
    const command: EditCommand = {
      type: 'fadeOut',
      params,
      timestamp: Date.now(),
    };
    this.editHistory.push(command);
    // Visual preview for fade not implemented in CSS yet
    console.log('Fade out command added:', command); // eslint-disable-line no-console
  }

  /**
   * Get edit history
   */
  getEditHistory(): EditCommand[] {
    return [...this.editHistory];
  }

  /**
   * Undo last edit
   */
  undo(): EditCommand | null {
    const lastCommand = this.editHistory.pop();
    if (lastCommand) {
      console.log('Undoing command:', lastCommand); // eslint-disable-line no-console
      this.recalculateState();
    }
    return lastCommand || null;
  }

  private recalculateState() {
    this.resetState();
    for (const command of this.editHistory) {
      switch (command.type) {
        case 'rotate':
          this.currentRotation = (this.currentRotation + command.params.degrees) % 360;
          break;
        case 'speed':
          this.currentSpeed = command.params.multiplier;
          break;
        case 'volume':
          this.currentVolume = command.params.level / 100;
          break;
        case 'crop':
          this.currentCrop = command.params;
          break;
        case 'trim':
          this.currentTrim = command.params;
          break;
      }
    }
  }

  /**
   * Clear all edits
   */
  clearEdits(): void {
    this.editHistory = [];
    this.resetState();
    console.log('All edits cleared'); // eslint-disable-line no-console
  }

  /**
   * Get current editor state
   */
  getState() {
    return {
      rotation: this.currentRotation,
      speed: this.currentSpeed,
      volume: this.currentVolume,
      crop: this.currentCrop,
      trim: this.currentTrim,
    };
  }

  /**
   * Export video with applied edits using MediaBunny
   */
  async export(options: ExportOptions): Promise<Blob> {
    if (!this.videoFile) {
      throw new Error('No video file loaded');
    }

    console.log('Starting export with options:', options); // eslint-disable-line no-console

    const mediabunny = await loadMediabunny();

    // 1. Input
    const input = await createBlobInput(this.videoFile, mediabunny);

    // 2. Output
    const { output, target } = createMp4Output(mediabunny);

    // 3. Process
    // We need to iterate through frames/samples and apply transformations

    // Prepare canvas for video transformations
    // Use OffscreenCanvas if available, otherwise regular Canvas
    const width = this.videoElement?.videoWidth || 1920;
    const height = this.videoElement?.videoHeight || 1080;

    let canvas: OffscreenCanvas | HTMLCanvasElement;
    let ctx: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D | null;

    if (typeof OffscreenCanvas !== 'undefined') {
      canvas = new OffscreenCanvas(width, height);
      ctx = canvas.getContext('2d') as OffscreenCanvasRenderingContext2D;
    } else {
      canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    try {
      // @ts-expect-error - Mediabunny types might be incomplete
      const reader = input.getReader();
      // @ts-expect-error - Mediabunny types might be incomplete
      const writer = output.getWriter();

      while (true) {
        const result = await reader.read();
        if (result.done) {
          break;
        }

        const sample = result.value;

        // Handle Trimming
        const sampleTime = sample.timestamp / 1_000_000; // Assuming microseconds
        if (this.currentTrim) {
          if (sampleTime < this.currentTrim.start) {
            sample.close();
            continue;
          }
          if (sampleTime > this.currentTrim.end) {
            sample.close();
            break; // Done
          }
          // Adjust timestamp relative to start
          sample.timestamp -= this.currentTrim.start * 1_000_000;
        }

        // Handle Video Frame
        if (sample.type === 'video') {
          // Apply Speed
          if (this.currentSpeed !== 1) {
            sample.duration /= this.currentSpeed;
            sample.timestamp /= this.currentSpeed;
          }

          // TODO: Implement Canvas drawing for rotation/crop if VideoFrame is available
          await writer.write(sample);
        } else if (sample.type === 'audio') {
          if (this.currentSpeed !== 1) {
            sample.duration /= this.currentSpeed;
            sample.timestamp /= this.currentSpeed;
          }
          await writer.write(sample);
        } else {
          await writer.write(sample);
        }
      }

      reader.releaseLock();
      writer.releaseLock();
    } catch (err) {
      console.error('Error during processing:', err);
      throw err;
    }

    return new Blob([target.buffer ?? new ArrayBuffer(0)], { type: 'video/mp4' });
  }

  /**
   * Get styles for the preview video element
   */
  getPreviewStyle(): { transform: string } {
    const transformParts: string[] = [];

    // Rotation
    if (this.currentRotation !== 0) {
      transformParts.push(`rotate(${this.currentRotation}deg)`);
    }

    // Crop (Simulation via scaling)
    if (this.currentCrop) {
      const { width, height, x, y } = this.currentCrop;
      if (width > 0 && height > 0) {
        const scaleX = 1 / width;
        const scaleY = 1 / height;
        // Center of the crop area in normalized coordinates
        const cropCenterX = x + width / 2;
        const cropCenterY = y + height / 2;

        // Translate to move crop center to view center (0.5, 0.5)
        const translateX = (0.5 - cropCenterX) * 100;
        const translateY = (0.5 - cropCenterY) * 100;

        transformParts.push(`scale(${scaleX}, ${scaleY})`);
        transformParts.push(`translate(${translateX}%, ${translateY}%)`);
      }
    }

    return {
      transform: transformParts.join(' '),
    };
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    if (this.videoElement) {
      URL.revokeObjectURL(this.videoElement.src);
      this.videoElement = null;
    }
    this.videoFile = null;
    this.editHistory = [];
    this.resetState();
  }
}

// Singleton instance
let editorInstance: VideoEditorEngine | null = null;

export function getEditorInstance(): VideoEditorEngine {
  if (!editorInstance) {
    editorInstance = new VideoEditorEngine();
  }
  return editorInstance;
}

export function resetEditorInstance(): void {
  if (editorInstance) {
    editorInstance.dispose();
    editorInstance = null;
  }
}
