/**
 * Chat API Route - Proxy to NestJS BFF
 *
 * This route proxies chat requests to the NestJS API server.
 * In production, the Fastify server handles this proxying directly.
 * This route is kept for development when running Next.js standalone.
 */

const API_URL = process.env.API_URL || 'http://localhost:3001';

async function validateTurnstileToken(token: string): Promise<boolean> {
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY || '',
        response: token,
      }),
    });

    const data = (await response.json()) as { success: boolean };
    return data.success === true;
  } catch (error) {
    console.error('Turnstile validation error:', error);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const { messages, turnstileToken, systemPromptExtra } = await req.json();

    // Validate Turnstile token
    if (!turnstileToken) {
      return new Response(JSON.stringify({ error: 'Turnstile token is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Skip Turnstile validation in development mode
    if (turnstileToken !== 'dev-mode-bypass') {
      const isValidToken = await validateTurnstileToken(turnstileToken);
      if (!isValidToken) {
        return new Response(JSON.stringify({ error: 'Invalid Turnstile token' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Forward request to NestJS API
    const apiResponse = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        turnstileToken,
        systemPromptExtra,
      }),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json().catch(() => ({}));
      return new Response(JSON.stringify({ error: errorData.error || 'API request failed' }), {
        status: apiResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Stream the response from the API
    return new Response(apiResponse.body, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
