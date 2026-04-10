FROM node:24-alpine AS base

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

FROM base AS builder

ARG DIRECTUS_HOST
ARG BASE_PATH
ARG NEXT_PUBLIC_URL
ARG IMAGE_DOMAINS
ARG NEXT_PUBLIC_CLOUDFLARE_SITE_KEY
ARG NEXT_PUBLIC_GTM_ID
ARG NEXT_PUBLIC_GA_ID

WORKDIR /app

# Copy root package files and lockfile for pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy workspace package files to allow pnpm to resolve dependencies correctly
# We copy the package.json of each workspace to ensure correct installation
COPY apps/web/package.json pnpm-lock.yaml ./apps/web/
COPY apps/api/package.json ./apps/api/
COPY apps/server/package.json ./apps/server/

# Install dependencies (using --frozen-lockfile for CI)
RUN pnpm install --frozen-lockfile

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

# Build all apps using turbo for efficiency
RUN pnpm run build

# Production stage
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0" 
ENV PORT=3000
ENV TRUST_PROXY=1

# Copy package files for workspace resolution in production
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY apps/api/package.json ./apps/api/
COPY apps/server/package.json ./apps/server/

# Copy built artifacts from builder stage
# Server dist files
COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY --from=builder /app/apps/server/package.json ./apps/server/

# Next.js web app (using the build output)
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/next.config.mjs ./apps/web/
COPY --from=builder /app/apps/web/package.json ./apps/web/
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/src ./apps/web/src

# API dist files
COPY --from=builder /app/apps/api/dist ./apps/api
COPY --from=builder /app/apps/api/package.json ./apps/api/

# Copy node_modules (optimized for production)
# In a real-world scenario, you might want to use pnpm deploy or 
# prune dependencies here, but for simplicity we copy from builder.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/server/node_modules ./apps/server/node_modules

EXPOSE 3000

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start the unified server
CMD ["pnpm", "start"]