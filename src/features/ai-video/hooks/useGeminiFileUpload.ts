'use client';

import { useEffect, useRef, useState } from 'react';

import { useTimelineStore } from '@/features/video-editor/hooks/useTimelineStore';

import { uploadFileToGemini } from '../lib/geminiFileApi';

export type AssetUploadStatus = 'pending' | 'uploading' | 'processing' | 'ready' | 'error';

/**
 * Watches the NLE timeline store for assets that haven't been uploaded to the
 * Gemini File API yet, uploads them in the background using the BYOK key, and
 * writes the resulting geminiUri back to the store.
 *
 * Returns a map of assetId → upload status so the UI can show indicators.
 */
export function useGeminiFileUpload(geminiKey: string | null): Map<string, AssetUploadStatus> {
  const { current, updateAssetGeminiUri } = useTimelineStore();

  // Track which assets are currently in-flight to avoid double-uploads
  const inFlightRef = useRef(new Set<string>());

  // Per-asset status for UI feedback
  const [statusMap, setStatusMap] = useState<Map<string, AssetUploadStatus>>(new Map());

  useEffect(() => {
    if (!geminiKey) return;

    for (const [assetId, asset] of Object.entries(current.assets)) {
      // Skip already uploaded or currently uploading assets
      if (asset.geminiUri) continue;
      if (inFlightRef.current.has(assetId)) continue;

      inFlightRef.current.add(assetId);
      setStatusMap(prev => new Map(prev).set(assetId, 'uploading'));

      uploadFileToGemini(asset.file, geminiKey, (phase) => {
        setStatusMap(prev => new Map(prev).set(assetId, phase === 'uploading' ? 'uploading' : 'processing'));
      })
        .then((geminiFile) => {
          updateAssetGeminiUri(assetId, geminiFile.uri);
          setStatusMap(prev => new Map(prev).set(assetId, 'ready'));
        })
        .catch((err) => {
          console.error(`[Gemini Upload] Failed for asset ${assetId}:`, err);
          setStatusMap(prev => new Map(prev).set(assetId, 'error'));
        })
        .finally(() => {
          inFlightRef.current.delete(assetId);
        });
    }
  }, [current.assets, geminiKey, updateAssetGeminiUri]);

  return statusMap;
}
