import { AppModule } from '@api/app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';

export async function bootstrap(existingServer?: any) {
  // Use an empty object if no server is provided to satisfy FastifyOptions type
  const adapter = new FastifyAdapter(existingServer ? (existingServer as any) : {});

  const app = await NestFactory.create(AppModule, adapter);

  if (!existingServer) {
    app.enableCors({
      origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
      credentials: true,
    });
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  if (!existingServer) {
    const port = Number.parseInt(process.env.API_PORT || '3001', 10);
    const host = process.env.HOST || '0.0.0.0';
    await app.listen(port, host);

    console.log(`🚀 API server running on http://${host}:${port}`);
  }

  return app;
}

if (process.env.APP_MODE !== 'integrated') {
  bootstrap();
}
