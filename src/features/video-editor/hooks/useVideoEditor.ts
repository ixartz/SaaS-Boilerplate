'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { EditorState, ExportOptions } from '../types/editor.types';
import { getEditorInstance, resetEditorInstance } from '../lib/video-editor-engine';

export function useVideoEditor() {
  const [state, setState] = useState<EditorState>({
    videoFile: null,
    videoUrl: null,
    currentTime: 0,
    duration: 0,
    isPlaying: false,
    volume: 100,
    editHistory: [],
    currentProject: null,
    isProcessing: false,
  });

  const editorRef = useRef(getEditorInstance());
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

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
        isProcessing: false,
      }));

      videoElementRef.current = videoElement;
    }
    catch (error) {
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
    }
    else {
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
      setState(prev => ({ ...prev, editHistory: history, isProcessing: false }));
    }
    catch (error) {
      console.error('Trim failed:', error);
      setState(prev => ({ ...prev, isProcessing: false }));
      throw error;
    }
  }, []);

  const crop = useCallback(async (aspectRatio: '16:9' | '1:1' | '9:16' | 'custom') => {
    setState(prev => ({ ...prev, isProcessing: true }));
    try {
      await editorRef.current.crop({ aspectRatio });
      const history = editorRef.current.getEditHistory();
      setState(prev => ({ ...prev, editHistory: history, isProcessing: false }));
    }
    catch (error) {
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
      setState(prev => ({ ...prev, editHistory: history, isProcessing: false }));
    }
    catch (error) {
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
      setState(prev => ({ ...prev, editHistory: history, isProcessing: false }));
    }
    catch (error) {
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
    }
    catch (error) {
      console.error('Export failed:', error);
      setState(prev => ({ ...prev, isProcessing: false }));
      throw error;
    }
  }, []);

  // Update current time
  useEffect(() => {
    const videoElement = videoElementRef.current;
    if (!videoElement)
      return;

    const handleTimeUpdate = () => {
      setState(prev => ({ ...prev, currentTime: videoElement.currentTime }));
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (state.videoUrl) {
        URL.revokeObjectURL(state.videoUrl);
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
