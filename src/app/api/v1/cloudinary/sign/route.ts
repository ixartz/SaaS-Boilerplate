import crypto from 'node:crypto';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { folder = 'general', public_id } = body;

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !apiKey || !apiSecret) {
      return new Response(
        JSON.stringify({
          error: 'Cloudinary configuration missing',
          details: {
            cloudName: !!cloudName,
            apiKey: !!apiKey,
            apiSecret: !!apiSecret,
          },
        }),
        {
          status: 500,
          headers: { 'content-type': 'application/json' },
        },
      );
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    
    // Create signature for upload
    const params = {
      timestamp: timestamp.toString(),
      folder: folder,
      public_id: public_id || `upload_${timestamp}`,
    };

    // Sort parameters for signature
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key as keyof typeof params]}`)
      .join('&');

    const stringToSign = `${sortedParams}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');

    return new Response(
      JSON.stringify({
        signature,
        timestamp,
        apiKey,
        cloudName,
        uploadPreset: uploadPreset || undefined,
        folder,
        publicId: params.public_id,
      }),
      {
        status: 200,
        headers: { 'content-type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error generating Cloudinary signature:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to generate signature',
        detail: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'content-type': 'application/json' },
      },
    );
  }
}
