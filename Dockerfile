FROM node:24-alpine AS builder

ARG DIRECTUS_HOST
ARG BASE_PATH
ARG NEXT_PUBLIC_URL
ARG IMAGE_DOMAINS
ARG NEXT_PUBLIC_CLOUDFLARE_SITE_KEY
ARG NEXT_PUBLIC_GTM_ID
ARG NEXT_PUBLIC_GA_ID

WORKDIR /app

# Copy root package files
COPY package*.json .npmrc* ./

# Copy workspace package files
COPY apps/web/package*.json apps/web/
COPY apps/api/package*.json apps/api/
COPY apps/server/package*.json apps/server/

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Set environment variables for build
ENV DIRECTUS_HOST=${DIRECTUS_HOST}
ENV BASE_PATH=${BASE_PATH}
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV IMAGE_DOMAINS=${IMAGE_DOMAINS}
ENV NEXT_PUBLIC_CLOUDFLARE_SITE_KEY=${NEXT_PUBLIC_CLOUDFLARE_SITE_KEY}
ENV NEXT_PUBLIC_GTM_ID=${NEXT_PUBLIC_GTM_ID}
ENV NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}

# Build all apps
RUN npm run build

# Production stage
FROM node:24-alpine

WORKDIR /app

# Copy package files for npm workspace resolution
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.npmrc ./

# Copy built artifacts - server dist files
COPY --from=builder /app/apps/server/dist/index.js ./apps/server/dist/
COPY --from=builder /app/apps/server/dist/index.d.ts ./apps/server/dist/
COPY --from=builder /app/apps/server/dist/index.js.map ./apps/server/dist/
COPY --from=builder /app/apps/server/dist/index.d.ts.map ./apps/server/dist/
COPY --from=builder /app/apps/server/package.json ./apps/server/

# Copy Next.js web app directory (build output only for custom server)
# We need the .next build output and config for the custom Fastify server
# Note: Without 'standalone' output, we copy the full .next directory
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/next.config.mjs ./apps/web/
COPY --from=builder /app/apps/web/package.json ./apps/web/
COPY --from=builder /app/apps/web/public ./apps/web/public
# Copy src directory needed for i18n and next.config.mjs runtime loading
COPY --from=builder /app/apps/web/src ./apps/web/src

# Copy API dist files
COPY --from=builder /app/apps/api/dist ./apps/api
COPY --from=builder /app/apps/api/package.json ./apps/api/

# Copy node_modules (all in root for workspaces)
COPY --from=builder /app/node_modules ./node_modules
# Copy workspace-specific node_modules that are not hoisted
COPY --from=builder /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules

# Note: .env files are NOT copied to production
# Environment variables should be set via Docker/container orchestration
# to preserve build-time values and allow runtime overrides

EXPOSE 3000

ENV HOSTNAME="0.0.0.0" PORT=3000 TRUST_PROXY=1 NODE_ENV=production

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start the unified server
CMD ["node", "apps/server/dist/index.js"]
