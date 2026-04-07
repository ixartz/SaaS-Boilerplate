import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

import type { ChatRequestDto, ChatResponseStream } from './dto/chat.dto';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private readonly openai: OpenAI;

  constructor() {
    const apiKey = process.env.CLOUDFLARE_AI_GATEWAY_TOKEN || process.env.OPENAI_API_KEY || '';
    const baseURL = process.env.CF_ACCOUNT_ID
      ? `https://gateway.ai.cloudflare.com/v1/${process.env.CF_ACCOUNT_ID}/portfolio-ai-gateway/compat`
      : undefined;

    this.openai = new OpenAI({
      apiKey,
      baseURL,
    });
  }

  async validateTurnstileToken(token: string): Promise<boolean> {
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
      this.logger.error('Turnstile validation error:', error);
      return false;
    }
  }

  async *createChatStream(request: ChatRequestDto): AsyncGenerator<ChatResponseStream> {
    const { messages, turnstileToken } = request;

    // Validate Turnstile token
    if (!turnstileToken) {
      throw new Error('Turnstile token is required');
    }

    // Skip Turnstile validation in development mode
    if (turnstileToken !== 'dev-mode-bypass') {
      const isValidToken = await this.validateTurnstileToken(turnstileToken);
      if (!isValidToken) {
        throw new Error('Invalid Turnstile token');
      }
    }

    const systemPrompt = process.env.AI_SYSTEM_PROMPT?.replace(/\\n/g, '\n') || '';

    const stream = await this.openai.chat.completions.create(
      {
        model: 'groq/llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        stream: true,
        temperature: 0.3,
      },
      {
        headers: {
          'cf-aig-byok-alias': 'portfolio-chat',
        },
      },
    );

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        yield {
          choices: [{ delta: { content } }],
        };
      }
    }

    yield { done: true };
  }
}
