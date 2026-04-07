FROM node:24-alpine AS builder

ARG DIRECTUS_HOST
ARG BASE_PATH
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
COPY packages/database/package*.json packages/database/
COPY packages/shared/package*.json packages/shared/

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Set environment variables for build
ENV DIRECTUS_HOST=${DIRECTUS_HOST}
ENV BASE_PATH=${BASE_PATH}
ENV IMAGE_DOMAINS=${IMAGE_DOMAINS}
ENV NEXT_PUBLIC_CLOUDFLARE_SITE_KEY=${NEXT_PUBLIC_CLOUDFLARE_SITE_KEY}
ENV NEXT_PUBLIC_GTM_ID=${NEXT_PUBLIC_GTM_ID}
ENV NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}

# Build all apps
RUN npm run build

# Production stage
FROM node:24-alpine

WORKDIR /app

# Copy built artifacts
COPY --from=builder /app/apps/server/dist ./apps/server
COPY --from=builder /app/apps/web/.next/standalone ./apps/web
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/api/dist ./apps/api
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/server/node_modules ./apps/server/node_modules
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/package.json ./

EXPOSE 3000

ENV HOSTNAME="0.0.0.0" PORT=3000 TRUST_PROXY=1 NODE_ENV=production

# Start the unified server
CMD ["node", "apps/server/dist/index.js"]