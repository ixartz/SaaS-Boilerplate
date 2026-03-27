'use client';

import { useRef } from 'react';
import { createUploadClient } from 'pushduck/client';

import type { AppUploadRouter } from '@/app/api/upload/route';

const upload = createUploadClient<AppUploadRouter>({
  endpoint: '/api/upload',
});

function UploadProgress({ progress }: { progress: number }) {
  return (
    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
      <div
        className="h-full rounded-full bg-blue-600 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function ImageUpload() {
  const { uploadFiles, files, isUploading, reset } = upload.imageUpload();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <div
        role="button"
        tabIndex={0}
        className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-blue-500"
        onClick={() => inputRef.current?.click()}
        onKeyDown={e => e.key === 'Enter' && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            const selected = Array.from(e.target.files ?? []);
            if (selected.length) uploadFiles(selected);
          }}
          disabled={isUploading}
        />
        <p className="text-sm text-gray-500">
          {isUploading
            ? 'Uploading...'
            : 'Click to upload images (JPEG, PNG, GIF, WebP — max 4\u202fMB each)'}
        </p>
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map(file => (
            <li
              key={file.id}
              className="flex items-start gap-3 rounded-lg border border-gray-200 p-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {file.name}
                </p>
                {file.status === 'uploading' && (
                  <UploadProgress progress={file.progress} />
                )}
                {file.status === 'success' && file.url && (
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-0.5 block truncate text-xs text-blue-600 hover:underline"
                  >
                    {file.url}
                  </a>
                )}
                {file.status === 'error' && (
                  <p className="mt-0.5 text-xs text-red-600">
                    {file.error ?? 'Upload failed'}
                  </p>
                )}
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                  file.status === 'success'
                    ? 'bg-green-100 text-green-700'
                    : file.status === 'error'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-600'
                }`}
              >
                {file.status === 'uploading'
                  ? `${file.progress}%`
                  : file.status}
              </span>
            </li>
          ))}
          <button
            type="button"
            onClick={reset}
            className="text-xs text-gray-500 underline hover:text-gray-700"
          >
            Clear all
          </button>
        </ul>
      )}
    </div>
  );
}

export function DocumentUpload() {
  const { uploadFiles, files, isUploading, reset } = upload.documentUpload();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <div
        role="button"
        tabIndex={0}
        className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-blue-500"
        onClick={() => inputRef.current?.click()}
        onKeyDown={e => e.key === 'Enter' && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            const selected = Array.from(e.target.files ?? []);
            if (selected.length) uploadFiles(selected);
          }}
          disabled={isUploading}
        />
        <p className="text-sm text-gray-500">
          {isUploading
            ? 'Uploading...'
            : 'Click to upload files (any type — max 16\u202fMB each)'}
        </p>
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map(file => (
            <li
              key={file.id}
              className="flex items-start gap-3 rounded-lg border border-gray-200 p-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {file.name}
                </p>
                {file.status === 'uploading' && (
                  <UploadProgress progress={file.progress} />
                )}
                {file.status === 'success' && file.url && (
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-0.5 block truncate text-xs text-blue-600 hover:underline"
                  >
                    {file.url}
                  </a>
                )}
                {file.status === 'error' && (
                  <p className="mt-0.5 text-xs text-red-600">
                    {file.error ?? 'Upload failed'}
                  </p>
                )}
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                  file.status === 'success'
                    ? 'bg-green-100 text-green-700'
                    : file.status === 'error'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-600'
                }`}
              >
                {file.status === 'uploading'
                  ? `${file.progress}%`
                  : file.status}
              </span>
            </li>
          ))}
          <button
            type="button"
            onClick={reset}
            className="text-xs text-gray-500 underline hover:text-gray-700"
          >
            Clear all
          </button>
        </ul>
      )}
    </div>
  );
}
