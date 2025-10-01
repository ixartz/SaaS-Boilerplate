import type { NextRequest } from 'next/server';

export async function GET(
  _req: NextRequest,
  { params }: { params: { projectId: string } },
) {
  try {
    const { projectId } = params;

    // Mock response for build time
    const mediaAssets: any[] = [];

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
