import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { config as dotenvConfig } from 'dotenv';

import { AppModule } from './app.module';

// Root directory of the monorepo (apps/server/src -> apps -> portfolio)
const rootDir = join(__dirname, '..', '..', '..');

// Determine NODE_ENV (before loading env files)
const nodeEnv = process.env.NODE_ENV || 'development';

// Only load .env files in development mode
// In production, environment variables should be set via Docker/container environment
// to preserve build-time values and allow runtime overrides
const isDev = nodeEnv === 'development';

if (isDev) {
  // Load environment files in order (later files override earlier ones)
  // This mimics Next.js's .env loading behavior:
  // 1. .env (base)
  // 2. .env.local (local overrides, not committed)
  // 3. .env.development or .env.production (mode-specific)
  // 4. .env.development.local or .env.production.local (mode-specific local, highest priority)
  const envFiles = [
    '.env',
    '.env.local',
    `.env.${nodeEnv}`,
    `.env.${nodeEnv}.local`,
  ];

  for (const envFile of envFiles) {
    const envPath = join(rootDir, envFile);
    if (existsSync(envPath)) {
      dotenvConfig({ path: envPath, override: true });
    }
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

  console.log(`🚀 API server running on http://${host}:${port}`);

  return app;
}

bootstrap();
