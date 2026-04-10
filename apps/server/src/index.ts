import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { chdir } from 'node:process';

import { bootstrap } from '@api/main.js';
import { config as dotenvConfig } from 'dotenv';
import Fastify from 'fastify';
import { Redis } from 'ioredis';

async function bootstrapServer() {
  // Root directory of the monorepo (apps/server/src -> apps -> portfolio)
  const rootDir = join(__dirname, '..', '..', '..');
  // Determine NODE_ENV (before loading env files)
  const nodeEnv = process.env.NODE_ENV || 'development';
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
  // Get BASE_PATH from environment (used for routing)
  const basePath = process.env.BASE_PATH || '';
  // Change working directory to the web app directory for Next.js
  const webDir = join(__dirname, '..', '..', 'web');
  chdir(webDir);
  // Initialize Redis connection for caching
  const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number.parseInt(process.env.REDIS_PORT || '6379', 10),
  });
  // Test Redis connection
  redis.on('connect', () => {
    console.log('📦 Redis connected');
  });
  redis.on('error', (err: Error) => {
    console.warn('⚠️ Redis connection error:', err.message);
  });
  const server = Fastify({
    logger: process.env.NODE_ENV !== 'production'
      ? {
          transport: {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss PPP',
              ignore: 'pid,hostname',
            },
          },
        }
      : {
          level: process.env.LOG_LEVEL || 'info',
        },
  });
  // Health check endpoint (always at /health, not affected by BASE_PATH)
  server.get('/health', async () => {
    let redisStatus = 'disconnected';
    try {
      const pong = await redis.ping();
      redisStatus = pong === 'PONG' ? 'connected' : 'unknown';
    } catch {
      redisStatus = 'error';
    }
    return { status: 'ok', timestamp: new Date().toISOString(), redis: redisStatus };
  });
  // Redis cache management endpoint
  server.get(`${basePath}/cache/clear`, async () => {
    try {
      const keys = await redis.keys('cache:*');
      if (keys.length > 0) {
        await redis.del(...keys);
      }
      return { status: 'ok', cleared: keys.length };
    } catch {
      return { status: 'error', message: 'Failed to clear cache' };
    }
  });

  // Bootstrap NestJS API in the same Fastify instance
  try {
    process.env.APP_MODE = 'integrated';
    await bootstrap(server);
    console.log('✅ NestJS API integrated into Fastify server');
  } catch (err) {
    console.error('❌ Failed to integrate NestJS API:', err);
  // We don't exit here so the frontend might still work,
  // but in a real app we might want to handle this differently.
  }

  // Setup Next.js dynamically
  const dev = process.env.NODE_ENV !== 'production';
  // Dynamic import for Next.js
  const nextModule = await import('next');
  // @ts-expect-error - Next.js default export is callable
  // In production, we don't need to specify dir as the build is already done
  const nextApp = nextModule.default({ dev, ...(dev ? { dir: webDir } : {}) });
  const handle = nextApp.getRequestHandler();

  await nextApp.prepare();

  // Handle all other requests with Next.js
  // Next.js request handler expects pathname WITH basePath included
  // because the routes manifest has basePath baked into the regex patterns
  server.route({
    method: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    url: '/*',
    handler: async (req, reply) => {
      const parsedUrl = new URL(req.url!, `http://${req.hostname}`);
      const pathname = parsedUrl.pathname;

      // Convert URLSearchParams to a plain object for Next.js handler
      const query: Record<string, string | string[]> = {};
      for (const [key, value] of parsedUrl.searchParams.entries()) {
        const allValues = parsedUrl.searchParams.getAll(key);
        query[key] = allValues.length > 1 ? allValues : value;
      }

      // Pass the full pathname (with basePath) to Next.js
      await handle(req.raw, reply.raw, {
        pathname,
        query,
      } as any);
      reply.hijack();
    },
  });

  const port = Number.parseInt(process.env.PORT || '3000', 10);
  const host = process.env.HOST || '0.0.0.0';
  const start = async () => {
    try {
      await server.listen({ port, host });
      console.log(`🚀 Server running on http://${host}:${port}`);
      console.log(`   → Base path: ${basePath || '/'}`);
      console.log(`   → Next.js app serving frontend`);
      console.log(`   → NestJS API integrated into this server`);
      console.log(`   → Redis caching enabled`);
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };

  start();

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    await server.close();
    await redis.quit();
    process.exit(0);
  });
}

bootstrapServer();
