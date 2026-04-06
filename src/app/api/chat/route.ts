// app/api/chat/route.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.CLOUDFLARE_AI_GATEWAY_TOKEN,
  baseURL: `https://gateway.ai.cloudflare.com/v1/${process.env.CF_ACCOUNT_ID}/portfolio-ai-gateway/compat`,
});

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

    const data = await response.json();
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

    const systemPromptBase = process.env.AI_SYSTEM_PROMPT?.replace(/\\n/g, '\n') || '';
    const systemPrompt = systemPromptExtra ? `${systemPromptBase}\n\n${systemPromptExtra}` : systemPromptBase;

    const stream = await openai.chat.completions.create({
      model: 'groq/llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      stream: true,
      temperature: 0.3,
    }, {
      headers: {
        'cf-aig-byok-alias': 'portfolio-chat',
      },
    });

    // Create a ReadableStream to return the SSE response
    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              const sseData = JSON.stringify({
                choices: [{ delta: { content } }],
              });
              controller.enqueue(encoder.encode(`data: ${sseData}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        } catch (error) {
          console.error('Stream error:', error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
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
