import { Body, Controller, Header, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import type { FastifyReply } from 'fastify';

// eslint-disable-next-line ts/consistent-type-imports -- NestJS needs runtime import for DI
import { ChatService } from './chat.service';
import type { ChatRequestDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'text/event-stream; charset=utf-8')
  @Header('Cache-Control', 'no-cache, no-transform')
  @Header('Connection', 'keep-alive')
  @Header('X-Content-Type-Options', 'nosniff')
  async chat(@Body() chatRequest: ChatRequestDto, @Res() reply: FastifyReply) {
    try {
      const stream = this.chatService.createChatStream(chatRequest);

      const encoder = new TextEncoder();

      for await (const chunk of stream) {
        if (chunk.done) {
          reply.raw.write(encoder.encode('data: [DONE]\n\n'));
        } else {
          const sseData = JSON.stringify(chunk);
          reply.raw.write(encoder.encode(`data: ${sseData}\n\n`));
        }
      }

      reply.raw.end();
    } catch (error) {
      this.handleError(reply, error);
    }
  }

  private handleError(reply: FastifyReply, error: unknown): void {
    const status = this.getHttpStatus(error);
    const message = error instanceof Error ? error.message : 'Failed to process request';

    // When using Fastify with SSE, we need to send a string response
    reply.status(status).header('Content-Type', 'application/json').send(JSON.stringify({
      error: message,
    }));
  }

  private getHttpStatus(error: unknown): number {
    if (error instanceof Error) {
      if (error.message === 'Turnstile token is required') {
        return 400;
      }
      if (error.message === 'Invalid Turnstile token') {
        return 403;
      }
    }
    return 500;
  }
}
