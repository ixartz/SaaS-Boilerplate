'use client';

import { Image, Transformation } from 'cloudinary-react';
import { Loader2, Upload, X } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CloudinaryUploadProps = {
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

export function CloudinaryUpload({
  value,
  onChange,
  onRemove,
  disabled = false,
  className,
  accept = 'image/*',
  maxSize = 5, // 5MB default
  folder = 'projects',
  publicId,
}: CloudinaryUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!uploadResponse.ok) {
        throw new Error('Cloudinary upload failed');
      }

      const result = await uploadResponse.json();
      onChange?.(result.secure_url);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Upload failed');
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
        // Format: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/public_id.jpg
        const parts = url.split('/');
        const uploadIndex = parts.findIndex(part => part === 'upload');

        if (uploadIndex !== -1 && uploadIndex + 1 < parts.length) {
          // Get everything after 'upload/' and before the file extension
          const pathAfterUpload = parts.slice(uploadIndex + 1).join('/');

          // Remove version if present (v1234567890/)
          const withoutVersion = pathAfterUpload.replace(/^v\d+\//, '');

          // Remove file extension
          const withoutExtension = withoutVersion.split('.')[0];

          // Return only if we have a meaningful public ID
          if (withoutExtension && withoutExtension.length > 0) {
            return withoutExtension;
          }
        }
      } catch (error) {
        console.warn('Error extracting public ID from Cloudinary URL:', error);
      }
    }

    // If we can't extract a valid public ID, return empty string
    return '';
  };

  // Show preview if we have a value
  if (value) {
    return (
      <div className={cn('space-y-2', className)}>
        <div className="group relative">
          <div className="relative overflow-hidden rounded-lg border-2 border-gray-200">
            <Image
              cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dy44qfit2'}
              publicId={getPublicId(value)}
              className="h-32 w-full object-cover"
            >
              <Transformation
                width={400}
                height={225}
                crop="fill"
                gravity="auto"
                quality="auto"
                fetchFormat="auto"
              />
            </Image>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-200 group-hover:bg-opacity-30">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="size-8 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                onClick={handleRemove}
                disabled={disabled}
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex w-full items-center justify-center">
        <label
          htmlFor="cloudinary-upload"
          className={cn(
            'flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors',
            disabled && 'opacity-50 cursor-not-allowed',
            error && 'border-destructive',
          )}
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            {isUploading
? (
              <Loader2 className="mb-4 size-8 animate-spin text-gray-500" />
            )
: (
              <Upload className="mb-4 size-8 text-gray-500" />
            )}
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">
                {isUploading ? 'Uploading...' : 'Click to upload'}
              </span>
              {!isUploading && ' or drag and drop'}
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF, WebP up to
{' '}
{maxSize}
MB
            </p>
          </div>
          <input
            id="cloudinary-upload"
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileSelect}
            disabled={disabled || isUploading}
          />
        </label>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
