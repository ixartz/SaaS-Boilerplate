'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { getEditorInstance, resetEditorInstance } from '../lib/video-editor-engine';
import type { EditorState, ExportOptions, TrimParams } from '../types/editor.types';

export function useVideoEditor() {
  const [state, setState] = useState<EditorState>({
    videoFile: null,
    videoUrl: null,
    currentTime: 0,
    duration: 0,
    width: 0,
    height: 0,
    isPlaying: false,
    volume: 100,
    playbackSpeed: 1,
    rotation: 0,
    crop: null,
    trim: null,
    editHistory: [],
    currentProject: null,
    isProcessing: false,
  });

  const editorRef = useRef(getEditorInstance());
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const trimRef = useRef<TrimParams | null>(null);
  const videoUrlRef = useRef<string | null>(null);

  // Sync refs
  useEffect(() => {
    trimRef.current = state.trim;
  }, [state.trim]);

  useEffect(() => {
    videoUrlRef.current = state.videoUrl;
  }, [state.videoUrl]);

  // Initialize video
  const loadVideo = useCallback(async (file: File) => {
    setState(prev => ({ ...prev, isProcessing: true }));

    try {
      await editorRef.current.initialize(file);
      const metadata = editorRef.current.getMetadata();
      const videoElement = editorRef.current.getVideoElement();

      const videoUrl = URL.createObjectURL(file);

      setState(prev => ({
        ...prev,
        videoFile: file,
        videoUrl,
        duration: metadata.duration,
        width: metadata.width,
        height: metadata.height,
        isProcessing: false,
      }));

      videoElementRef.current = videoElement;
    } catch (error) {
      console.error('Failed to load video:', error);
      setState(prev => ({ ...prev, isProcessing: false }));
      throw error;
    }
  }, []);

  // Play/Pause controls
  const play = useCallback(() => {
    if (videoElementRef.current) {
      videoElementRef.current.play();
      setState(prev => ({ ...prev, isPlaying: true }));
    }
  }, []);

  const pause = useCallback(() => {
    if (videoElementRef.current) {
      videoElementRef.current.pause();
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  // Seek
  const seek = useCallback((time: number) => {
    if (videoElementRef.current) {
      videoElementRef.current.currentTime = time;
      setState(prev => ({ ...prev, currentTime: time }));
    }
  }, []);

  // Volume control
  const setVolume = useCallback(async (level: number) => {
    await editorRef.current.adjustVolume({ level });
    setState(prev => ({ ...prev, volume: level }));
  }, []);

  // Editing operations
  const trim = useCallback(async (start: number, end: number) => {
    setState(prev => ({ ...prev, isProcessing: true }));
    try {
      await editorRef.current.trim({ start, end });
      const history = editorRef.current.getEditHistory();
      setState(prev => ({
        ...prev,
        editHistory: history,
        isProcessing: false,
        trim: { start, end },
      }));
    } catch (error) {
      console.error('Trim failed:', error);
      setState(prev => ({ ...prev, isProcessing: false }));
      throw error;
    }
  }, []);

  const crop = useCallback(async (aspectRatio: '16:9' | '1:1' | '9:16' | 'custom') => {
    setState(prev => ({ ...prev, isProcessing: true }));
    try {
      // Get metadata to calculate center crop
      let metadata;
      try {
        metadata = editorRef.current.getMetadata();
      } catch {
        // Fallback if not initialized (shouldn't happen if loaded)
        metadata = { width: 1920, height: 1080 };
      }

      const videoAspect = metadata.width / metadata.height;
      let targetAspect = videoAspect;

      switch (aspectRatio) {
        case '16:9':
          targetAspect = 16 / 9;
          break;
        case '1:1':
          targetAspect = 1;
          break;
        case '9:16':
          targetAspect = 9 / 16;
          break;
        case 'custom':
          targetAspect = videoAspect;
          break; // No change for custom initially
      }

      let width = 1;
      let height = 1;
      let x = 0;
      let y = 0;

      if (targetAspect > videoAspect) {
        // Target is wider than source. Crop height.
        // height = videoAspect / targetAspect
        height = videoAspect / targetAspect;
        y = (1 - height) / 2;
      } else {
        // Target is taller than source. Crop width.
        // width = targetAspect / videoAspect
        width = targetAspect / videoAspect;
        x = (1 - width) / 2;
      }

      const params: import('../types/editor.types').CropParams = {
        aspectRatio,
        x,
        y,
        width,
        height,
      };

      await editorRef.current.crop(params);
      const history = editorRef.current.getEditHistory();
      setState(prev => ({
        ...prev,
        editHistory: history,
        isProcessing: false,
        crop: params,
      }));
    } catch (error) {
      console.error('Crop failed:', error);
      setState(prev => ({ ...prev, isProcessing: false }));
      throw error;
    }
  }, []);

  const rotate = useCallback(async (degrees: 90 | 180 | 270) => {
    setState(prev => ({ ...prev, isProcessing: true }));
    try {
      await editorRef.current.rotate({ degrees });
      const history = editorRef.current.getEditHistory();
      setState(prev => ({
        ...prev,
        editHistory: history,
        isProcessing: false,
        rotation: (prev.rotation + degrees) % 360,
      }));
    } catch (error) {
      console.error('Rotate failed:', error);
      setState(prev => ({ ...prev, isProcessing: false }));
      throw error;
    }
  }, []);

  const changeSpeed = useCallback(async (multiplier: number) => {
    setState(prev => ({ ...prev, isProcessing: true }));
    try {
      await editorRef.current.changeSpeed({ multiplier });
      const history = editorRef.current.getEditHistory();
      setState(prev => ({
        ...prev,
        editHistory: history,
        isProcessing: false,
        playbackSpeed: multiplier,
      }));
    } catch (error) {
      console.error('Change speed failed:', error);
      setState(prev => ({ ...prev, isProcessing: false }));
      throw error;
    }
  }, []);

  const undo = useCallback(() => {
    const undoneCommand = editorRef.current.undo();
    if (undoneCommand) {
      const history = editorRef.current.getEditHistory();
      setState(prev => ({ ...prev, editHistory: history }));
    }
  }, []);

  const clearEdits = useCallback(() => {
    editorRef.current.clearEdits();
    setState(prev => ({ ...prev, editHistory: [] }));
  }, []);

  // Export
  const exportVideo = useCallback(async (options: ExportOptions): Promise<Blob> => {
    setState(prev => ({ ...prev, isProcessing: true }));
    try {
      const blob = await editorRef.current.export(options);
      setState(prev => ({ ...prev, isProcessing: false }));
      return blob;
    } catch (error) {
      console.error('Export failed:', error);
      setState(prev => ({ ...prev, isProcessing: false }));
      throw error;
    }
  }, []);

  // Update current time
  useEffect(() => {
    const videoElement = videoElementRef.current;
    if (!videoElement) {
      return;
    }

    const handleTimeUpdate = () => {
      const currentTime = videoElement.currentTime;
      // Handle trim loop
      if (trimRef.current) {
        if (currentTime < trimRef.current.start || currentTime >= trimRef.current.end) {
          videoElement.currentTime = trimRef.current.start;
          setState(prev => ({ ...prev, currentTime: trimRef.current!.start }));
          return;
        }
      }
      setState(prev => ({ ...prev, currentTime }));
    };

    const handleEnded = () => {
      setState(prev => ({ ...prev, isPlaying: false }));
    };

    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('ended', handleEnded);

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, [state.videoFile]);

  // Apply preview effects when state changes
  useEffect(() => {
    const videoElement = videoElementRef.current;
    if (videoElement) {
      editorRef.current.applyPreviewEffects(videoElement);
    }
  }, [state.rotation, state.crop, state.playbackSpeed, state.volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoUrlRef.current) {
        URL.revokeObjectURL(videoUrlRef.current);
      }
      resetEditorInstance();
    };
  }, []);

  return {
    state,
    actions: {
      loadVideo,
      play,
      pause,
      togglePlayPause,
      seek,
      setVolume,
      trim,
      crop,
      rotate,
      changeSpeed,
      undo,
      clearEdits,
      exportVideo,
    },
    videoElement: videoElementRef.current,
  };
}
