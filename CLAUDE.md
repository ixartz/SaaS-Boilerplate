# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Development Server**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint` (or `npm run lint:fix` to auto-fix)
- **Type Check**: `npm run check-types`
- **Test (Unit)**: `npm run test` (Vitest); single test: `npx vitest run path/to/test.ts`
- **Test (E2E)**: `npm run test:e2e` (Playwright)
- **Database**:
  - Generate migrations: `npm run db:generate` (run after any schema change in `src/models/Schema.ts`)
  - Run migrations: `npm run db:migrate`
  - Studio: `npm run db:studio`
- **Commit**: `npm run commit` (commitizen / Conventional Commits)

## Architecture & Structure

**Framework**: Next.js App Router, React, TypeScript, Tailwind CSS.

**Route layout** (no locale prefix):
- `src/app/page.tsx` — public landing page
- `src/app/layout.tsx` — root layout (wraps everything in `ClerkProvider`)
- `src/app/(auth)/` — authenticated routes (protected via Clerk middleware)
  - `editor/` — standalone video editor (trim, crop, rotate, speed, volume, merge)
  - `ai-video/` — AI-assisted editor (video preview + AI chat panel)
  - `(center)/sign-in|sign-up/` — Clerk auth pages
  - `onboarding/` — org-selection flow

**Key source directories**:
- `src/features/video-editor/` — core editor feature
  - `lib/video-editor-engine.ts` — `VideoEditorEngine` class (singleton via `getEditorInstance()`), manages edit history and MediaBunny export
  - `hooks/useVideoEditor.ts` — React hook wrapping the engine; exposes `state` + `actions`
  - `components/` — `VideoPreview`, `VideoUpload`, `EditorToolbar`, `MergeVideosTool`
  - `types/editor.types.ts` — all editor types (`EditCommand`, `EditorState`, `ExportOptions`, etc.)
- `src/features/ai-video/` — AI chat + video editor combined view
  - `components/AIVideoEditor.tsx` — layout: left=`VideoPreview`, right=`AIChatInterface`
  - `components/AIChatInterface.tsx` — sends messages to `/api/chat`, applies returned `tool_action` to editor
- `src/app/api/chat/route.ts` — LangChain/LangGraph ReAct agent (Google Gemini `gemini-flash-latest`) with tools for each edit operation; returns `{ punny_response, tool_action }`
- `src/lib/mediabunny-loader.ts` — lazy-loads the `mediabunny` npm package (browser-only); helpers: `createBlobInput`, `createMp4Output`, `createAudioOutput`
- `src/libs/` — server-side singletons: `DB.ts` (Drizzle+Postgres), `Env.ts` (t3-oss validated env), `Logger.ts` (Pino)
- `src/models/Schema.ts` — Drizzle schema: `organizationSchema`, `todoSchema`, `videoProjectsSchema`, `videoEditsSchema`, `userUsageSchema`
- `src/utils/AppConfig.ts` — app name + Stripe pricing plans (Free / Premium $79 / Enterprise $199)
- `src/templates/` — landing page section components (Hero, Navbar, Features, Pricing, FAQ, CTA, Footer)
- `src/components/ui/` — Shadcn UI components

## Key Architectural Patterns

**Video editor data flow**:
1. `useVideoEditor` hook holds React state (`EditorState`) and a ref to the `VideoEditorEngine` singleton.
2. Edit operations (trim, crop, rotate, etc.) call engine methods that append to `editHistory` and update internal state. The engine applies CSS transforms for live preview.
3. Export calls `VideoEditorEngine.export()` which uses MediaBunny to process the raw file with the accumulated edit commands into an MP4 blob. **MediaBunny must only be called in the browser.**

**AI chat → editor bridge**:
- `AIChatInterface` POSTs `{ messages, videoContext }` to `/api/chat`.
- The LangGraph agent returns `{ punny_response, tool_action: { name, args } }`.
- The client maps `tool_action.name` to the corresponding `actions.*` call on `useVideoEditor`.

**Auth**: Clerk middleware (`src/middleware.ts`) protects `/dashboard`, `/onboarding`, `/ai-video`, and `/editor`. No `next-intl` — i18n has been removed.

## Environment Variables

Required (validated in `src/libs/Env.ts` + used in API route):
- `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `BILLING_PLAN_ENV` — `dev` | `test` | `prod`
- `GOOGLE_API_KEY` — for Google Gemini in `/api/chat` (not in `Env.ts`, read directly from `process.env`)
- `DATABASE_URL` — optional; Drizzle/Postgres

## Coding Conventions

- **Imports**: Absolute via `@/` prefix.
- **Commits**: Conventional Commits format (`feat:`, `fix:`, `chore:` etc.).
- **Database**: Edit schema in `src/models/Schema.ts`, then run `npm run db:generate`.
- **Types**: Strict TypeScript. Use Zod for validation at boundaries.
