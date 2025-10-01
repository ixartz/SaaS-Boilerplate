import crypto from 'node:crypto';

import type { NextRequest } from 'next/server';

import { db } from '@/libs/DB';
import { mediaAssetsSchema } from '@/models/Schema';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const projectId = formData.get('projectId') as string;
    const folder = formData.get('folder') as string || 'general';

    if (!file) {
      return new Response(
        JSON.stringify({
          error: 'No file provided',
        }),
        {
          status: 400,
          headers: { 'content-type': 'application/json' },
        },
      );
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return new Response(
        JSON.stringify({
          error: 'Cloudinary configuration missing',
        }),
        {
          status: 500,
          headers: { 'content-type': 'application/json' },
        },
      );
    }

    // Generate signature for upload
    const timestamp = Math.round(new Date().getTime() / 1000);
    const publicId = `${folder}/${Date.now()}_${file.name.split('.')[0]}`;

    const params = {
      timestamp: timestamp.toString(),
      folder,
      public_id: publicId,
    };

    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key as keyof typeof params]}`)
      .join('&');

    const stringToSign = `${sortedParams}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');

    // Upload to Cloudinary
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('api_key', apiKey);
    uploadFormData.append('timestamp', timestamp.toString());
    uploadFormData.append('signature', signature);
    uploadFormData.append('folder', folder);
    uploadFormData.append('public_id', publicId);

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: uploadFormData,
      },
    );

    if (!uploadResponse.ok) {
      throw new Error('Cloudinary upload failed');
    }

    const uploadResult = await uploadResponse.json();

    // Save metadata to database
    const [mediaAsset] = await db
      .insert(mediaAssetsSchema)
      .values({
        cloudinaryPublicId: uploadResult.public_id,
        cloudinaryUrl: uploadResult.secure_url,
        width: uploadResult.width,
        height: uploadResult.height,
        kind: 'IMAGE',
        filename: file.name,
        mimeType: file.type,
        size: file.size,
        uploadedBy: 'test-user', // In production, get from auth context
        orgId: 'test-org', // In production, get from auth context
      })
      .returning();

    if (!mediaAsset) {
      return new Response(
        JSON.stringify({
          error: 'Failed to save media asset',
        }),
        {
          status: 500,
          headers: { 'content-type': 'application/json' },
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        mediaAsset: {
          id: mediaAsset.id,
          publicId: mediaAsset.cloudinaryPublicId,
          secureUrl: mediaAsset.cloudinaryUrl,
          width: mediaAsset.width,
          height: mediaAsset.height,
          kind: mediaAsset.kind,
          projectId: projectId || null,
        },
      }),
      {
        status: 200,
        headers: { 'content-type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error uploading media:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to upload media',
        detail: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'content-type': 'application/json' },
      },
    );
  }
}
