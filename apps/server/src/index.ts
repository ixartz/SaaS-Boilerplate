import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { chdir } from 'node:process';
import { fileURLToPath } from 'node:url';

import httpProxy from '@fastify/http-proxy';
import { config as dotenvConfig } from 'dotenv';
import Fastify from 'fastify';

const __dirname = dirname(fileURLToPath(import.meta.url));

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

const server = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
  },
});

// Health check endpoint (always at /health, not affected by BASE_PATH)
server.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
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
// @ts-expect-error - Next.js default export is callable
const nextApp = nextModule.default({ dev, dir: webDir });
const handle = nextApp.getRequestHandler();

await nextApp.prepare();

// Handle all other requests with Next.js (including BASE_PATH)
server.all('*', async (req, reply) => {
  const parsedUrl = new URL(req.url!, `http://${req.hostname}`);
  await handle(req.raw, reply.raw, {
    pathname: parsedUrl.pathname,
    query: parsedUrl.searchParams,
  } as any);
  reply.hijack();
});

const port = Number.parseInt(process.env.PORT || '3000', 10);
const host = process.env.HOST || '0.0.0.0';

const start = async () => {
  try {
    await server.listen({ port, host });
    // eslint-disable-next-line no-console
    console.log(`🚀 Server running on http://${host}:${port}`);
    // eslint-disable-next-line no-console
    console.log(`   → Base path: ${basePath || '/'}`);
    // eslint-disable-next-line no-console
    console.log(`   → Next.js app serving frontend`);
    // eslint-disable-next-line no-console
    console.log(`   → API requests proxied to ${process.env.API_URL || 'http://localhost:3001'}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();

// Graceful shutdown
process.on('SIGTERM', async () => {
  await server.close();
  process.exit(0);
});

export { server };
