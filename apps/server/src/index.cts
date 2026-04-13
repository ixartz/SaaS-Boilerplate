import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { chdir } from 'node:process';

import httpProxy from '@fastify/http-proxy';
import { config as dotenvConfig } from 'dotenv';
import Fastify from 'fastify';
import { Redis } from 'ioredis';

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

async function bootstrap() {
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
    logger: {
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

  // API health check (at /api/health or {basePath}/api/health)
  server.get(`${basePath}/api/health`, async () => {
    try {
      const api = await fetch(`${process.env.API_URL || 'http://localhost:3001'}/health`);
      if (api.ok) {
        return { status: 'ok', api: 'connected' };
      }
      return { status: 'degraded', api: 'disconnected' };
    } catch {
      return { status: 'degraded', api: 'disconnected' };
    }
  });

  // Add preHandler to strip Expect header before proxying (undici doesn't support it)
  await server.addHook('onRequest', (request, reply, done) => {
    if (request.url.startsWith(`${basePath}/api`)) {
    // Remove Expect header from incoming request to prevent undici errors
      delete request.headers.expect;
    }
    done();
  });

  // Register API proxy - routes {basePath}/api/* to NestJS API
  await server.register(httpProxy, {
    upstream: process.env.API_URL || 'http://localhost:3001',
    prefix: `${basePath}/api`,
    httpMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  });

  // Setup Next.js dynamically
  const dev = process.env.NODE_ENV !== 'production';

  // Dynamic import for Next.js
  const nextModule = await import('next');
  // In production, we don't need to specify dir as the build is already done
  const nextApp = nextModule.default({ dev, ...(dev ? { dir: webDir } : {}) });
  const handle = nextApp.getRequestHandler();

  await nextApp.prepare();

  // Handle all other requests with Next.js
  // Next.js request handler expects pathname WITH basePath included
  // because the routes manifest has basePath baked into the regex patterns
  server.all('*', async (req, reply) => {
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
  });

  const port = Number.parseInt(process.env.PORT || '3000', 10);
  const host = process.env.HOST || '0.0.0.0';

  const start = async () => {
    try {
      await server.listen({ port, host });

      console.log(`🚀 Server running on http://${host}:${port}`);

      console.log(`   → Base path: ${basePath || '/'}`);

      console.log(`   → Next.js app serving frontend`);

      console.log(`   → API requests proxied to ${process.env.API_URL || 'http://localhost:3001'}`);

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

bootstrap();
