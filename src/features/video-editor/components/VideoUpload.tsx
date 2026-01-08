'use client';

import { Upload } from 'lucide-react';
import { useCallback, useState } from 'react';

interface VideoUploadProps {
  onVideoSelect: (file: File) => void;
  maxFileSize?: number; // in bytes
  acceptedFormats?: string[];
}

export function VideoUpload({
  onVideoSelect,
  maxFileSize = 100 * 1024 * 1024, // 100MB default
  acceptedFormats = ['video/mp4', 'video/quicktime', 'video/webm'],
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
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px]">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={
          isDragging
            ? 'relative flex flex-col items-center justify-center w-full max-w-2xl border-2 border-dashed rounded-lg p-12 transition-all cursor-pointer border-primary bg-primary/5 scale-105'
            : 'relative flex flex-col items-center justify-center w-full max-w-2xl border-2 border-dashed rounded-lg p-12 transition-all cursor-pointer border-gray-300 hover:border-primary hover:bg-gray-50'
        }
      >
        <input
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center gap-4 text-center pointer-events-none">
          <div className="p-4 rounded-full bg-primary/10">
            <Upload className="w-12 h-12 text-primary" />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">
              Upload Your Video
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your video here, or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supported formats: MP4, MOV, WebM • Max size: {maxSizeMB}MB
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 max-w-2xl w-full">
          <p className="font-medium">Upload Error</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}
    </div>
  );
}
