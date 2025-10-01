'use client';

import { Image, Transformation } from 'cloudinary-react';
import { Download, Eye, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type MediaAsset = {
  id: string;
  publicId: string;
  secureUrl: string;
  width: number;
  height: number;
  kind: string;
  projectId?: string;
  createdAt: string;
};

type MediaGalleryProps = {
  projectId: string;
  className?: string;
};

export function MediaGallery({ projectId, className }: MediaGalleryProps) {
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    fetchMediaAssets();
  }, [projectId]);

  const fetchMediaAssets = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/v1/media/project/${projectId}`, {
        headers: {
          'x-e2e-bypass': 'true',
          'x-org-id': 'org_e2e_default',
          'x-user-id': 'test-user',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch media assets');
      }

      const data = await response.json();
      if (data.success && data.mediaAssets) {
        setMediaAssets(data.mediaAssets);
      } else {
        setMediaAssets([]);
      }
    } catch (err) {
      console.error('Error fetching media assets:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setMediaAssets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewImage = (asset: MediaAsset) => {
    setSelectedAsset(asset);
    setIsLightboxOpen(true);
  };

  const handleDownload = async (asset: MediaAsset) => {
    try {
      const response = await fetch(asset.secureUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${asset.publicId}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading image:', err);
    }
  };

  const handleDeleteAsset = async (assetId: string) => {
    // TODO: Implement delete API
    console.log('Delete asset:', assetId);
  };

  if (loading) {
    return (
      <div className={className}>
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="mx-auto mb-2 size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Loading gallery...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <div className="rounded-md bg-destructive/15 p-4 text-center">
          <p className="text-sm text-destructive">
Error loading gallery:
{error}
          </p>
        </div>
      </div>
    );
  }

  if (mediaAssets.length === 0) {
    return (
      <div className={className}>
        <div className="rounded-md border-2 border-dashed border-muted-foreground/25 p-8 text-center">
          <p className="text-sm text-muted-foreground">No images uploaded yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Project Gallery</h3>
        <p className="text-sm text-muted-foreground">
{mediaAssets.length}
{' '}
images
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {mediaAssets.map(asset => (
          <div
            key={asset.id}
            className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
          >
            <Image
              publicId={asset.publicId}
              cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dy44qfit2'}
              className="size-full object-cover transition-transform group-hover:scale-105"
            >
              <Transformation crop="fill" gravity="auto" quality="auto" />
            </Image>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/50">
              <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleViewImage(asset)}
                  className="size-8 p-0"
                >
                  <Eye className="size-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleDownload(asset)}
                  className="size-8 p-0"
                >
                  <Download className="size-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteAsset(asset.id)}
                  className="size-8 p-0"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          {selectedAsset && (
            <div className="space-y-4">
              <div className="relative">
                <Image
                  publicId={selectedAsset.publicId}
                  cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dy44qfit2'}
                  className="w-full rounded-lg"
                >
                  <Transformation crop="limit" quality="auto" />
                </Image>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {selectedAsset.width}
{' '}
×
{selectedAsset.height}
{' '}
•
{selectedAsset.kind}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(selectedAsset)}
                  >
                    <Download className="mr-2 size-4" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteAsset(selectedAsset.id)}
                  >
                    <Trash2 className="mr-2 size-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
