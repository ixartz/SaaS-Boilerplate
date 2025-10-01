'use client';

import React from 'react';

import { MediaGallery } from '@/components/ui/media-gallery';
import { UploadGallery } from '@/components/ui/upload-gallery';

type ProjectGalleryPageProps = {
  params: {
    id: string;
  };
};

export default function ProjectGalleryPage({ params }: ProjectGalleryPageProps) {
  const { id: projectId } = params;

  const handleUploadComplete = () => {
    // Refresh the gallery
    window.location.reload();
  };

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Project Gallery</h1>
          <p className="text-muted-foreground">
            Upload and manage images for this project
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-lg font-semibold">Upload Images</h2>
        <UploadGallery
          projectId={projectId}
          folder="projects"
          multiple
          onUploadComplete={handleUploadComplete}
        />
      </div>

      {/* Gallery Section */}
      <div className="rounded-lg border p-6">
        <MediaGallery projectId={projectId} />
      </div>
    </div>
  );
}
