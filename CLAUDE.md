# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Development Server**: `npm run dev` (starts Next.js, etc.)
- **Build**: `npm run build`
- **Start Production**: `npm run start`
- **Lint**: `npm run lint` (or `npm run lint:fix` to fix)
- **Type Check**: `npm run check-types`
- **Test (Unit)**: `npm run test` (Vitest)
  - Single test: `npx vitest run path/to/test.ts`
- **Test (E2E)**: `npm run test:e2e` (Playwright)
- **Database**:
  - Generate migrations: `npm run db:generate`
  - Run migrations: `npm run db:migrate`
  - Studio: `npm run db:studio` (Drizzle Studio)
- **Storybook**: `npm run storybook`
- **Commit**: `npm run commit` (uses commitizen for conventional commits)

## Architecture & Structure

- **Framework**: Next.js 14+ (App Router), React, Tailwind CSS, TypeScript.
- **Structure**:
  - `src/app`: Next.js App Router routes and layouts.
  - `src/components`: Reusable UI components (shadcn/ui, etc.).
  - `src/features`: Feature-specific components and logic.
  - `src/models`: Database schema definitions (Drizzle ORM).
  - `src/libs`: Third-party library configurations (DB, Env, Logger).
  - `src/locales`: Internationalization (i18n) files.
  - `src/templates`: Page templates/layouts.
  - `src/utils`: Shared utility functions.
  - `tests/`: Unit and E2E tests.
  - `migrations/`: Drizzle migration files.
- **Data Layer**: Drizzle ORM with PostgreSQL compatibility. Schema in `src/models/Schema.ts`.
- **Authentication**: Clerk (managed via `src/libs/Env.mjs` and middleware).
- **Styling**: Tailwind CSS with Shadcn UI components.
- **Internationalization**: `next-intl` with JSON files in `src/locales`.
- **Error Handling**: Sentry integration.
- **Logging**: Pino logger.

## Coding Conventions

- **Commits**: Follow [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat:`, `fix:`, `chore:`).
- **Imports**: Absolute imports using `@/` prefix.
- **Database**:
  - Modify schema in `src/models/Schema.ts`.
  - Always run `npm run db:generate` after schema changes.
- **Types**: Strict TypeScript mode enabled. Use Zod for validation.
- **Testing**:
  - Unit tests alongside source or in `tests/` using Vitest.
  - E2E tests in `tests/e2e/` using Playwright.
