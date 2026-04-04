// app/api/chat/route.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.CLOUDFLARE_AI_GATEWAY_TOKEN,
  baseURL: `https://gateway.ai.cloudflare.com/v1/${process.env.CF_ACCOUNT_ID}/portfolio-ai-gateway/compat`,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = process.env.AI_SYSTEM_PROMPT?.replace(/\\n/g, '\n');

    const stream = await openai.chat.completions.create({
      model: 'groq/llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt || '' },
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
