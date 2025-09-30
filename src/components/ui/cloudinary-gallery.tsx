'use client';

import { Image, Transformation } from 'cloudinary-react';
import { Eye, Plus, X } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CloudinaryGalleryProps = {
  images: string[];
  onChange?: (images: string[]) => void;
  disabled?: boolean;
  className?: string;
  maxImages?: number;
  folder?: string;
  publicId?: string;
  showPreview?: boolean;
};

export function CloudinaryGallery({
  images = [],
  onChange,
  disabled = false,
  className,
  maxImages = 10,
  folder = 'daily-logs',
  publicId,
  showPreview = true,
}: CloudinaryGalleryProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) {
 return;
}

    // Check if adding these files would exceed maxImages
    if (images.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const uploadPromises = files.map(async (file) => {
        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`File ${file.name} is too large (max 5MB)`);
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`File ${file.name} is not an image`);
        }

        // Get Cloudinary signature
        const signatureResponse = await fetch('/api/v1/cloudinary/sign', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            folder,
            public_id: publicId || `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
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
        formData.append('public_id', publicId || `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: 'POST',
            body: formData,
          },
        );

        if (!uploadResponse.ok) {
          throw new Error(`Upload failed for ${file.name}`);
        }

        const result = await uploadResponse.json();
        return result.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const newImages = [...images, ...uploadedUrls];
      onChange?.(newImages);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange?.(newImages);
  };

  const handlePreview = (image: string) => {
    setPreviewImage(image);
  };

  const closePreview = () => {
    setPreviewImage(null);
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

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Button */}
      {images.length < maxImages && (
        <div className="flex items-center justify-center">
          <label
            htmlFor="cloudinary-gallery-upload"
            className={cn(
              'flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors',
              disabled && 'opacity-50 cursor-not-allowed',
              error && 'border-destructive',
            )}
          >
            <div className="flex flex-col items-center space-y-2">
              {isUploading
? (
                <div className="size-6 animate-spin rounded-full border-b-2 border-gray-900" />
              )
: (
                <Plus className="size-6" />
              )}
              <span className="text-sm">
                {isUploading ? 'Uploading...' : `Add Images (${images.length}/${maxImages})`}
              </span>
            </div>
            <input
              id="cloudinary-gallery-upload"
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              disabled={disabled || isUploading}
            />
          </label>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-sm text-destructive">{error}</p>}

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <div key={index} className="group relative">
              <div className="aspect-square overflow-hidden rounded-lg border-2 border-gray-200">
                <Image
                  cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dy44qfit2'}
                  publicId={getPublicId(image)}
                  className="size-full object-cover"
                >
                  <Transformation
                    width={200}
                    height={200}
                    crop="fill"
                    gravity="auto"
                    quality="auto"
                    fetchFormat="auto"
                  />
                </Image>
              </div>

              {/* Overlay Actions */}
              <div className="absolute inset-0 flex items-center justify-center space-x-2 bg-black bg-opacity-0 transition-all duration-200 group-hover:bg-opacity-30">
                {showPreview && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="size-8 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    onClick={() => handlePreview(image)}
                  >
                    <Eye className="size-4" />
                  </Button>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="size-8 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  onClick={() => handleRemove(index)}
                  disabled={disabled}
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative max-h-full max-w-4xl p-4">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-4 top-4 z-10"
              onClick={closePreview}
            >
              <X className="size-4" />
            </Button>
            <Image
              cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dy44qfit2'}
              publicId={getPublicId(previewImage)}
              className="max-h-full max-w-full object-contain"
            >
              <Transformation
                width={800}
                height={600}
                crop="limit"
                quality="auto"
                fetchFormat="auto"
              />
            </Image>
          </div>
        </div>
      )}
    </div>
  );
}
