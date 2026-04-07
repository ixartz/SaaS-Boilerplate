# Portfolio Monorepo

A modern portfolio monorepo featuring a Next.js frontend, NestJS BFF (Backend for Frontend), and a unified Fastify server.

## 🏗️ Architecture

This is a monorepo with the following structure:

```
portfolio/
├── apps/
│   ├── api/          # NestJS BFF API server
│   ├── server/       # Fastify custom server (unifies API + Next.js)
│   └── web/          # Next.js frontend application
├── packages/
│   ├── database/     # Shared database utilities
│   └── shared/       # Shared utilities and types
└── public/           # Static assets
```

### Key Components

1. **@portfolio/api** - NestJS BFF
   - Handles all API logic (chat, etc.)
   - Uses Fastify adapter for high performance
   - Runs on port 3001 (internal)

2. **@portfolio/web** - Next.js Frontend
   - React 19 with Next.js 16
   - Mantine UI components
   - Internationalization support
   - Runs on port 3002 (dev) / integrated in production

3. **@portfolio/server** - Fastify Custom Server
   - Unifies API and frontend under one server
   - Proxies `/api/*` requests to NestJS
   - Serves Next.js for all other routes
   - Runs on port 3000

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20
- npm >= 9

### Installation

```bash
# Install all dependencies
npm install

# Or install for specific workspace
npm install -w apps/web
```

### Development

```bash
# Start the unified server (recommended)
npm run dev

# Or start individual apps:
npm run dev:web    # Next.js on port 3002
npm run dev:api    # NestJS on port 3001
```

### Building

```bash
# Build all apps
npm run build

# Build specific app
npm run build:web
npm run build:api
npm run build:server
```

### Production

```bash
# Start the production server
npm start
```

## 📝 Environment Variables

Copy `.env` to `.env.local` and configure:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
BILLING_PLAN_ENV=dev

# AI Chat
CLOUDFLARE_TURNSTILE_SECRET_KEY=
CLOUDFLARE_AI_GATEWAY_TOKEN=
CF_ACCOUNT_ID=
AI_SYSTEM_PROMPT=

# Monorepo Configuration
API_URL=http://localhost:3001
API_PORT=3001
PORT=3000
HOST=0.0.0.0
```

## 🐳 Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build and run the Dockerfile directly
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run e2e tests
npm run test:e2e

# Run tests for specific app
npm test -w apps/web
```

## 📦 Workspace Packages

### Apps

| Package | Description | Port |
|---------|-------------|------|
| `@portfolio/web` | Next.js frontend | 3002 (dev) |
| `@portfolio/api` | NestJS BFF | 3001 |
| `@portfolio/server` | Fastify unified server | 3000 |

### Internal Packages

| Package | Description |
|---------|-------------|
| `@portfolio/database` | Database schema and utilities |
| `@portfolio/shared` | Shared types and utilities |

## 🔧 Development Commands

```bash
npm run lint          # Lint all workspaces
npm run lint:fix      # Fix linting issues
npm run check-types   # Type check all workspaces
npm run clean         # Clean all build artifacts
```

## 📄 License

MIT
