declare module 'cloudinary-react' {
  import type { ReactNode } from 'react';

  export type ImageProps = {
    cloudName: string;
    publicId: string;
    alt?: string;
    className?: string;
    onClick?: () => void;
    children?: ReactNode;
  };

  export type TransformationProps = {
    width?: number;
    height?: number;
    crop?: string;
    gravity?: string;
    quality?: string;
    fetchFormat?: string;
  };

  export const Image: React.FC<ImageProps>;
  export const Transformation: React.FC<TransformationProps>;
}
