import crypto from 'node:crypto';

import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { folder = 'general', public_id } = body;

    // Cloudinary configuration
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

    const timestamp = Math.round(new Date().getTime() / 1000);
    const stringToSign = `folder=${folder}&public_id=${public_id}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');

    return new Response(
      JSON.stringify({
        signature,
        timestamp,
        apiKey,
        cloudName,
      }),
      {
        status: 200,
        headers: { 'content-type': 'application/json' },
      },
    );
  } catch (error) {
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
