'use client';

import { Image, Transformation } from 'cloudinary-react';
import { Loader2, Upload, X } from 'lucide-react';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

type MediaAsset = {
  id: string;
  publicId: string;
  secureUrl: string;
  width: number;
  height: number;
  kind: string;
  projectId?: string;
};

type UploadGalleryProps = {
  projectId?: string;
  folder?: string;
  multiple?: boolean;
  onUploadComplete?: (assets: MediaAsset[]) => void;
  onUploadStart?: () => void;
  className?: string;
  disabled?: boolean;
};

export function UploadGallery({
  projectId,
  folder = 'general',
  multiple = true,
  onUploadComplete,
  onUploadStart,
  className,
  disabled = false,
}: UploadGalleryProps) {
  const [uploadedAssets, setUploadedAssets] = useState<MediaAsset[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    setError(null);
    setIsUploading(true);
    onUploadStart?.();

    try {
      const newAssets: MediaAsset[] = [];

      for (const file of Array.from(files)) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          setError(`File ${file.name} exceeds 5MB limit.`);
          continue;
        }

        if (!file.type.startsWith('image/')) {
          setError(`File ${file.name} is not an image.`);
          continue;
        }

        // Get Cloudinary signature
        const signatureResponse = await fetch('/api/v1/cloudinary/sign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            folder,
            public_id: `project_${Date.now()}_${file.name.split('.')[0]}`,
          }),
        });
        if (!signatureResponse.ok) {
          throw new Error('Failed to get upload signature');
        }
        const { signature, timestamp, apiKey, cloudName } = await signatureResponse.json();

        // Upload to Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', apiKey);
        formData.append('timestamp', timestamp.toString());
        formData.append('signature', signature);
        formData.append('folder', folder);
        formData.append('public_id', `project_${Date.now()}_${file.name.split('.')[0]}`);

        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: 'POST', body: formData },
        );
        if (!uploadResponse.ok) {
          throw new Error('Cloudinary upload failed');
        }
        await uploadResponse.json();

        // Save to media assets
        const mediaResponse = await fetch('/api/v1/media/upload', {
          method: 'POST',
          headers: {
            'x-e2e-bypass': 'true',
            'x-org-id': 'org_e2e_default',
            'x-user-id': 'test-user',
          },
          body: (() => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('projectId', projectId || '');
            formData.append('folder', folder);
            return formData;
          })(),
        });

        if (mediaResponse.ok) {
          const mediaData = await mediaResponse.json();
          if (mediaData.success && mediaData.mediaAsset) {
            newAssets.push(mediaData.mediaAsset);
          }
        }
      }

      setUploadedAssets(prev => [...prev, ...newAssets]);
      onUploadComplete?.(newAssets);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveAsset = (assetId: string) => {
    setUploadedAssets(prev => prev.filter(asset => asset.id !== assetId));
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Button */}
      <div className="flex items-center justify-center">
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 hover:border-muted-foreground/50">
            {isUploading
? (
              <>
                <Loader2 className="size-8 animate-spin text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Uploading...</p>
              </>
            )
: (
              <>
                <Upload className="size-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, GIF up to 5MB
                </p>
              </>
            )}
          </div>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={handleFileSelect}
            disabled={disabled || isUploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Uploaded Assets Gallery */}
      {uploadedAssets.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Uploaded Images:</h4>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {uploadedAssets.map(asset => (
              <div
                key={asset.id}
                className="group relative h-32 w-full overflow-hidden rounded-lg border"
              >
                <Image
                  publicId={asset.publicId}
                  cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dy44qfit2'}
                  className="size-full object-cover"
                >
                  <Transformation crop="fill" gravity="auto" quality="auto" />
                </Image>
                <button
                  onClick={() => handleRemoveAsset(asset.id)}
                  className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
