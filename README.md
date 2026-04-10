# 🚀 Portfolio Monorepo

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-v10-E0234E?style=flat-square&logo=nestjs)](https://nestjs.com/)
[![Fastify](https://img.shields.io/badge/Fastify-v4-black?style=flat-square&logo=fastify)](https://www.fastify.io/)
[![Mantine](https://img.shields.io/badge/Mantine-v8-blue?style=flat-square)](https://mantine.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Turborepo](https://img.shields.io/badge/Turbo-Monorepo-orange?style=flat-square)](https://turbo.build/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare_AI-Enabled-orange?style=flat-square&logo=cloudflare)](https://www.cloudflare.com/)
[![Groq](https://img.shields.io/badge/Groq-LPU-yellow?style=flat-square)](https://groq.com/)

A high-performance, full-stack portfolio platform built with a modern monorepo architecture. This project showcases advanced integration of AI chat capabilities, secure authentication, and seamless payment processing.

## 🛠️ Tech Stack

### Core Frameworks & Languages
- **Frontend**: [Next.js 16](https://nextjs.org/) (App Router), [Mantine v8](https://mantine.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Backend**: [NestJS v10](https://nestjs.com/), [Fastify](https://www.fastify.io/), [Drizzle ORM](https://orm.drizzle.team/)
- **Monorepo**: [Turborepo](https://turbo.build/), [pnpm](https://pnpm.io/)

### Services & Infrastructure
- **AI/ML**: [Cloudflare AI Gateway](https://developers.cloudflare.com/ai/), [Groq LPU](https://groq.com/)
- **CMS**: [Directus](https://directus.io/) (Content Management System)
- **Auth**: [Clerk](https://clerk.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via Drizzle)

---

## ✨ Key Features

- 🤖 **AI Chat Integration**: Powered by Cloudflare AI Gateway for intelligent interactions.
- 🔐 **Secure Authentication**: Managed via Clerk for robust user identity management.
- 💳 **Subscription Engine**: Seamless Stripe integration for premium features.
- 🌍 **Internationalization**: Full i18n support using `next-intl`.
- ⚡ **Unified Server**: Custom Fastify server unifying Next.js and NestJS under a single entry point.
- 🏗️ **Monorepo Architecture**: Scalable structure managed by Turborepo and pnpm.

---

## 🏗️ Architecture

The project follows a monorepo pattern to maintain high cohesion and low coupling between services.

### Data Flow
`[ Client (Next.js) ] ➔ [ Gateway (Fastify) ] ➔ [ BFF API (NestJS) ] ➔ [ Directus CMS / AI Services / DB ]`

1. **Client**: Interacts with the UI and sends requests to the Gateway.
2. **Gateway**: Acts as a single entry point, proxying requests to the appropriate microservices or serving static assets.
3. **BFF (Backend for Frontend)**: Orchestrates business logic, handles AI orchestration via Groq/Cloudflare, and manages data fetching from Directus and other services.
4. **Services & CMS**: Integrates with **Directus** for content management, Drizzle ORM for database access, and external AI/Auth providers.

### Directory Structure

```text
portfolio/
├── apps/
│   ├── api/          # NestJS BFF (Backend for Frontend)
│   ├── server/       # Fastify Custom Server (Unified Entry Point)
│   └── web/          # Next.js 16 Frontend Application
├── packages/
│   ├── database/     # Shared Drizzle ORM & Database Schema
│   └── shared/       # Common Types, Utilities & Constants
└── public/           # Static Assets
```

### Service Breakdown

| Component | Technology | Role | Port (Dev) |
| :--- | :--- | :--- | :--- |
| **Frontend** | `Next.js 16` | User Interface & Client Logic  |
| **BFF API** | `NestJS v10` | Business Logic & AI Orchestration |
| **Gateway** | `Fastify` | Unified Server (Proxies & Static Serving) | `3000` |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- [pnpm](https://pnpm.io/) >= 9

### Installation

```bash
# Install all dependencies across the workspace
pnpm install
```

### Database Setup

Ensure you have a PostgreSQL instance running, then:

```bash
# Generate Drizzle schema migrations
pnpm db:generate

# Apply migrations to your database
pnpm db:migrate

# Open Drizzle Studio to view data
pnpm db:studio
```

### Development Workflow

```bash
# Start the unified Fastify server (Recommended)
pnpm dev

# Run individual services in parallel
pnpm dev:web    # Next.js frontend
pnpm dev:api    # NestJS API
```

### Building & Production

```bash
# Build all applications using Turborepo
pnpm build

# Start the production environment
pnpm start
```

---

## 📝 Environment Configuration

Create a `.env` file in the root and populate the following variables:

```env
# --- Authentication (Clerk) ---
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# --- Payments (Stripe) ---
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
BILLING_PLAN_ENV=dev

# --- AI Capabilities (Cloudflare) ---
CLOUDFLARE_TURNSTILE_SECRET_KEY=
CLOUDFLARE_AI_GATEWAY_TOKEN=
CF_ACCOUNT_ID=
AI_SYSTEM_PROMPT="You are a helpful assistant..."

# --- Server Configuration ---
API_URL=http://localhost:3001
API_PORT=3001
PORT=3000
HOST=0.0.0.0
```

---

## 🐳 Deployment & DevOps

### Docker Support

The project is container-ready for seamless deployment.

```bash
# Build and run the entire stack via Docker Compose
docker-compose up --build

# Or build a standalone image
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

### Testing Suite

```bash
# Run all unit and integration tests (Vitest)
pnpm test

# Execute end-to-end testing (Playwright)
pnpm test:e2e
```

---

## 🔧 Maintenance Commands

| Command | Description |
| :--- | :--- |
| `pnpm run lint` | Run ESLint across all workspaces |
| `pnpm run check-types` | Perform TypeScript type checking |
| `pnpm run clean` | Remove build artifacts and cache |

## 📄 License

MIT
