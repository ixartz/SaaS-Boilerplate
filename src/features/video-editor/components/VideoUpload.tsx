'use client';

import { Upload } from 'lucide-react';
import { useCallback, useState } from 'react';

type VideoUploadProps = {
  onVideoSelect: (file: File) => void;
  maxFileSize?: number; // in bytes
  acceptedFormats?: string[];
};

const DEFAULT_ACCEPTED_FORMATS = ['video/mp4', 'video/quicktime', 'video/webm'];

export function VideoUpload({
  onVideoSelect,
  maxFileSize = 100 * 1024 * 1024, // 100MB default
  acceptedFormats = DEFAULT_ACCEPTED_FORMATS,
}: VideoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback(
    (file: File): string | null => {
      // Check file type
      if (!acceptedFormats.includes(file.type)) {
        return `Invalid file type. Please upload ${acceptedFormats.map(f => f.split('/')[1]?.toUpperCase() || 'VIDEO').join(', ')} files.`;
      }

      // Check file size
      if (file.size > maxFileSize) {
        const maxSizeMB = Math.round(maxFileSize / (1024 * 1024));
        const fileSizeMB = Math.round(file.size / (1024 * 1024));
        return `File too large (${fileSizeMB}MB). Maximum size is ${maxSizeMB}MB.`;
      }

      return null;
    },
    [acceptedFormats, maxFileSize],
  );

  const handleFile = useCallback(
    (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      setError(null);
      onVideoSelect(file);
    },
    [validateFile, onVideoSelect],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const firstFile = files[0];
      if (firstFile) {
        handleFile(firstFile);
      }
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      const firstFile = files?.[0];
      if (firstFile) {
        handleFile(firstFile);
      }
    },
    [handleFile],
  );

  const maxSizeMB = Math.round(maxFileSize / (1024 * 1024));

  return (
    <div className="flex size-full min-h-[400px] flex-col items-center justify-center">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={
          isDragging
            ? 'relative flex w-full max-w-2xl scale-105 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary bg-primary/5 p-12 transition-all'
            : 'relative flex w-full max-w-2xl cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 transition-all hover:border-primary hover:bg-gray-50'
        }
      >
        <input
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileInput}
          className="absolute inset-0 size-full cursor-pointer opacity-0"
        />

        <div className="pointer-events-none flex flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-primary/10 p-4">
            <Upload className="size-12 text-primary" />
          </div>

          <div>
            <h3 className="mb-2 text-xl font-semibold">
              Upload Your Video
            </h3>
            <p className="mb-4 text-gray-600">
              Drag and drop your video here, or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supported formats: MP4, MOV, WebM • Max size:
              {' '}
              {maxSizeMB}
              MB
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 w-full max-w-2xl rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <p className="font-medium">Upload Error</p>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
