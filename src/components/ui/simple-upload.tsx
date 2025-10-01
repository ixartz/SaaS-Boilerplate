'use client';

import { Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SimpleUploadProps = {
  value?: string;
  onChange?: (url: string) => void;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
  accept?: string;
  maxSize?: number; // in MB
  folder?: string;
  publicId?: string;
};

export function SimpleUpload({
  value,
  onChange,
  onRemove,
  disabled = false,
  className,
  accept = 'image/*',
  maxSize = 5, // 5MB default
  folder = 'projects',
  publicId,
}: SimpleUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setError(null);
    setIsUploading(true);

    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit.`);
      setIsUploading(false);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed.');
      setIsUploading(false);
      return;
    }

    try {
      // Get Cloudinary signature
      const signatureResponse = await fetch('/api/v1/cloudinary/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          folder,
          public_id: publicId || `project_${Date.now()}`,
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
      formData.append('public_id', publicId || `project_${Date.now()}`);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: formData },
      );
      if (!uploadResponse.ok) {
        throw new Error('Cloudinary upload failed');
      }
      const result = await uploadResponse.json();
      onChange?.(result.secure_url);
    } catch (cloudinaryError) {
      console.error('Cloudinary upload failed:', cloudinaryError);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setError(null);
    onRemove?.();
  };

  // Extract public ID from Cloudinary URL
  const getPublicId = (url: string) => {
    if (!url) {
      return '';
    }

    // Check if it's already a Cloudinary URL
    if (url.includes('res.cloudinary.com')) {
      try {
        // Extract public ID from Cloudinary URL
        // Format: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/public_id.ext
        const urlParts = url.split('/');
        const uploadIndex = urlParts.findIndex(part => part === 'upload');
        if (uploadIndex !== -1 && urlParts.length > uploadIndex + 2) {
          // Skip version if present
          const startIndex = urlParts[uploadIndex + 1]?.startsWith('v') ? uploadIndex + 2 : uploadIndex + 1;
          const publicIdParts = urlParts.slice(startIndex);
          return publicIdParts.join('/').replace(/\.[^/.]+$/, ''); // Remove extension
        }
      } catch (err) {
        console.warn('Failed to extract public ID from URL:', err);
      }
    }

    return url; // Fallback to full URL
  };

  return (
    <div className={cn('space-y-4', className)}>
      {!value
? (
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
                    PNG, JPG, GIF up to
{' '}
{maxSize}
MB
                  </p>
                </>
              )}
            </div>
            <input
              id="file-upload"
              type="file"
              accept={accept}
              onChange={handleFileSelect}
              disabled={disabled || isUploading}
              className="hidden"
            />
          </label>
        </div>
      )
: (
        <div className="relative">
          <div className="aspect-video w-full overflow-hidden rounded-lg border">
            <Image
              src={value || '/images/placeholder.svg'}
              alt="Project thumbnail"
              width={400}
              height={300}
              className="size-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleRemove}
            disabled={disabled || isUploading}
            className="absolute right-2 top-2 size-8 p-0"
          >
            <X className="size-4" />
          </Button>
        </div>
      )}

      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}
    </div>
  );
}
