'use client';

import { Image, Transformation } from 'cloudinary-react';
import React from 'react';

import { cn } from '@/lib/utils';

type CloudinaryImageProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  crop?: string;
  gravity?: string;
  quality?: string;
  fetchFormat?: string;
  onClick?: () => void;
};

export function CloudinaryImage({
  src,
  alt = 'Image',
  width = 200,
  height = 200,
  className,
  crop = 'fill',
  gravity = 'auto',
  quality = 'auto',
  fetchFormat = 'auto',
  onClick,
}: CloudinaryImageProps) {
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

  const publicId = getPublicId(src);

  if (!publicId) {
    return (
      <div
        className={cn(
          'bg-gray-200 flex items-center justify-center text-gray-500',
          className,
        )}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        role="button"
        tabIndex={0}
      >
        No Image
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <Image
        cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dy44qfit2'}
        publicId={publicId}
        alt={alt}
        className={cn('object-cover', className)}
      >
      <Transformation
        width={width}
        height={height}
        crop={crop}
        gravity={gravity}
        quality={quality}
        fetchFormat={fetchFormat}
      />
      </Image>
    </div>
  );
}
