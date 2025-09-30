'use client';

import { Upload, X } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type UploadProps = {
  value?: string;
  onChange?: (url: string) => void;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
  accept?: string;
  maxSize?: number; // in MB
};

export function UploadButton({
  value,
  onChange,
  onRemove,
  disabled = false,
  className,
  accept = 'image/*',
  maxSize = 5, // 5MB default
}: UploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
 return;
}

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Get Cloudinary signature
      const signatureResponse = await fetch('/api/v1/cloudinary/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          folder: 'projects',
          public_id: `project_${Date.now()}`,
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
      formData.append('folder', 'projects');
      formData.append('public_id', `project_${Date.now()}`);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!uploadResponse.ok) {
        throw new Error('Upload failed');
      }

      const result = await uploadResponse.json();
      onChange?.(result.secure_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setError(null);
    onRemove?.();
  };

  if (value) {
    return (
      <div className={cn('space-y-2', className)}>
        <div className="relative">
          <img
            src={value}
            alt="Project thumbnail"
            className="h-32 w-full rounded-lg object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2 size-6"
            onClick={handleRemove}
            disabled={disabled}
          >
            <X className="size-3" />
          </Button>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex w-full items-center justify-center">
        <label
          htmlFor="upload"
          className={cn(
            'flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100',
            disabled && 'opacity-50 cursor-not-allowed',
            error && 'border-destructive',
          )}
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <Upload className="mb-4 size-8 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span>
{' '}
or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to
{' '}
{maxSize}
MB
            </p>
          </div>
          <input
            id="upload"
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileSelect}
            disabled={disabled || isUploading}
          />
        </label>
      </div>
      {isUploading && (
        <p className="text-sm text-muted-foreground">Uploading...</p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
