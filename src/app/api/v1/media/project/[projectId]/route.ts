import { isNull } from 'drizzle-orm';
import type { NextRequest } from 'next/server';

import { db } from '@/libs/DB';
import { mediaAssetsSchema } from '@/models/Schema';

export async function GET(
  _req: NextRequest,
  { params }: { params: { projectId: string } },
) {
  try {
    const { projectId } = params;

    const mediaAssets = await db
      .select({
        id: mediaAssetsSchema.id,
        publicId: mediaAssetsSchema.cloudinaryPublicId,
        secureUrl: mediaAssetsSchema.cloudinaryUrl,
        width: mediaAssetsSchema.width,
        height: mediaAssetsSchema.height,
        kind: mediaAssetsSchema.kind,
        projectId: projectId as any,
        createdAt: mediaAssetsSchema.createdAt,
      })
      .from(mediaAssetsSchema)
      .where(
        isNull(mediaAssetsSchema.deletedAt),
      );

    return new Response(
      JSON.stringify({
        success: true,
        mediaAssets: mediaAssets.map(asset => ({
          ...asset,
          createdAt: (asset.createdAt as Date)?.toISOString(),
        })),
      }),
      {
        status: 200,
        headers: { 'content-type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error fetching project media:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch project media',
        detail: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'content-type': 'application/json' },
      },
    );
  }
}
