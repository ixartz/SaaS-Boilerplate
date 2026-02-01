# AGENTS.md

This file provides context and guidelines for AI agents working in this repository.

## Project Overview
This is a modern web application built with **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, and **Drizzle ORM**. It uses **Clerk** for authentication and **Shadcn UI** for components.

## 1. Build, Lint, and Test Commands

### Core Commands
- **Start Dev Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Start Production Server**: `npm run start`

### Quality Checks
- **Lint**: `npm run lint`
- **Lint & Fix**: `npm run lint:fix`
- **Type Check**: `npm run check-types` (Runs `tsc` without emitting files)

### Testing
- **Run Unit Tests**: `npm run test` (Uses Vitest)
- **Run Single Unit Test**: `npx vitest run path/to/test.ts`
- **Run E2E Tests**: `npm run test:e2e` (Uses Playwright)
- **Test UI Mode**: `npx vitest --ui`

### Database
- **Generate Migrations**: `npm run db:generate` (Run after schema changes)
- **Apply Migrations**: `npm run db:migrate`
- **Open Database Studio**: `npm run db:studio`

## 2. Code Style & Guidelines

### File Structure
- `src/app`: Next.js App Router routes. Use `page.tsx`, `layout.tsx`, `loading.tsx`.
- `src/components`: Shared UI components (mostly Shadcn).
- `src/features`: Feature-based architecture. Group components, hooks, and types by feature (e.g., `src/features/video-editor`).
- `src/libs`: Third-party configuration (Env, DB, Logger).
- `src/models`: Drizzle ORM schema definitions.
- `src/utils`: Shared utility functions.

### Imports
- **Absolute Imports**: Always use the `@/` alias for internal imports.
  ```typescript
  // ✅ Good
  import { Button } from '@/components/ui/button';

  // ❌ Bad
  import { Button } from '../../components/ui/button';
  ```
- **Order**: External libraries first, then internal absolute imports, then relative styles (if any).

### Naming Conventions
- **Components**: PascalCase (e.g., `VideoPlayer.tsx`, `function VideoPlayer()`).
- **Hooks**: camelCase with `use` prefix (e.g., `useVideoEditor.ts`).
- **Functions/Variables**: camelCase.
- **Types/Interfaces**: PascalCase.
- **Files**:
  - Components/Pages: PascalCase or consistent with Next.js conventions (page.tsx).
  - Utilities/Hooks: camelCase.

### TypeScript
- **Strict Mode**: Enabled. Do not use `any`.
- **Validation**: Use **Zod** for runtime validation (API inputs, form data).
- **Interfaces vs Types**: Prefer `interface` for object definitions, `type` for unions/primitives.
- **Exports**: Named exports are preferred for components and utilities.

### React & Next.js
- **Server vs Client**: Use `'use client'` directive at the top of files only when necessary (interactive hooks, event listeners).
- **Functional Components**: Use arrow functions or function declarations consistently.
- **Props**: Destructure props in the function signature.
- **Hooks**: Follow the Rules of Hooks. Place custom hooks in `src/hooks` or `src/features/*/hooks`.

### Styling
- **Tailwind CSS**: Use utility classes for styling.
- **Shadcn UI**: Use the pre-built components in `src/components/ui`.
- **Merging Classes**: Use `cn()` utility (clsx + tailwind-merge) when accepting `className` props.
  ```tsx
  import { cn } from '@/lib/utils';

  export function MyComponent({ className }: { className?: string }) {
    return <div className={cn('bg-red-500', className)} />;
  }
  ```

### Database (Drizzle ORM)
- Schema definitions live in `src/models/Schema.ts`.
- After modifying the schema, **IMMEDIATELY** run `npm run db:generate`.
- Do not manually edit migration files unless necessary for data migration logic.

### Error Handling
- Use **Sentry** for error tracking.
- Handle promises with `try/catch` blocks or `.catch()`.
- Use descriptive error messages.

### Logging
- Use **Pino** for logging. Avoid `console.log` in production code.

## 3. Git & Commits
- **Conventional Commits**: Format commit messages as `type(scope): description`.
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
- **Example**: `feat(auth): add google oauth provider`

## 4. Cursor/Copilot Rules
- **Context Awareness**: Always check the file path and neighboring files to understand the feature context.
- **No Hallucinations**: Do not import libraries that are not in `package.json`.
- **Idempotency**: Scripts and commands should be runnable multiple times without side effects where possible.
