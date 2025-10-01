'use client';

import Image from 'next/image';
import React from 'react';

import { cn } from '@/lib/utils';

type SafeImageProps = {
  src?: string | null;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallback?: string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  sizes?: string;
};

export function SafeImage({
  src,
  alt,
  width,
  height,
  className,
  fallback = '/images/placeholder.svg',
  priority = false,
  quality = 75,
  fill = false,
  sizes,
}: SafeImageProps) {
  // Determine the actual image source
  const imageSrc = React.useMemo(() => {
    if (!src) {
      return fallback;
    }

    // If it's a Cloudinary URL, use it directly
    if (src.startsWith('https://res.cloudinary.com/')) {
      return src;
    }

    // If it's a data URL or other valid URL, use it
    if (src.startsWith('data:') || src.startsWith('http')) {
      return src;
    }

    // Otherwise, use fallback
    return fallback;
  }, [src, fallback]);

  // Check if it's a Cloudinary URL for optimization
  const isCloudinary = imageSrc.startsWith('https://res.cloudinary.com/');

  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={cn('object-cover', className)}
        priority={priority}
        quality={quality}
        sizes={sizes}
        unoptimized={!isCloudinary} // Only optimize Cloudinary images
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={cn('object-cover', className)}
      priority={priority}
      quality={quality}
      sizes={sizes}
      unoptimized={!isCloudinary} // Only optimize Cloudinary images
    />
  );
}
