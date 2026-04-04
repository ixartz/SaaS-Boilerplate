FROM node:24-alpine AS builder

ARG DIRECTUS_HOST
ARG BASE_PATH
ARG IMAGE_DOMAINS

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV DIRECTUS_HOST=${DIRECTUS_HOST}
ENV BASE_PATH=${BASE_PATH}
ENV IMAGE_DOMAINS=${IMAGE_DOMAINS}
RUN npm run build

FROM node:24-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
ENV HOSTNAME="0.0.0.0" PORT=3000 TRUST_PROXY=1
CMD ["node", "server.js"]