import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { config } from 'dotenv';

import { AppModule } from './app.module';

// Load environment variables from root .env files
const rootDir = join(__dirname, '..', '..', '..');
const nodeEnv = process.env.NODE_ENV || 'development';

// Load in order (later files override earlier ones)
const envFiles = [
  join(rootDir, '.env'),
  join(rootDir, '.env.local'),
  join(rootDir, `.env.${nodeEnv}`),
  join(rootDir, `.env.${nodeEnv}.local`),
];

for (const envFile of envFiles) {
  if (existsSync(envFile)) {
    config({ path: envFile, override: true });
  }
}

export async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = Number.parseInt(process.env.API_PORT || '3001', 10);
  const host = process.env.HOST || '0.0.0.0';
  await app.listen(port, host);

  // eslint-disable-next-line no-console
  console.log(`🚀 API server running on http://${host}:${port}`);

  return app;
}

bootstrap();
