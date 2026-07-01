---
name: saas-builder
description: Clone, verify, map, and build on top of ixartz/SaaS-Boilerplate for a user's SaaS idea. Use when a user wants to reuse SaaS Boilerplate, evaluate how their product fits it, or build product-specific pages, database schema, roles, permissions, MVP features, and launch scope on top of the boilerplate.
---

# SaaS Builder

## Purpose

Verify the local baseline, then adapt the boilerplate's routes, schema, auth, i18n, UI, and tests for the user's SaaS MVP.

## Mandatory Baseline Gate

Run these commands before planning, editing, or implementing product-specific work:

```bash
git clone https://github.com/ixartz/SaaS-Boilerplate.git <target-directory>
cd <target-directory>
npm install
```

Users usually run `npx skills add ixartz/saas-boilerplate` from a parent/root directory; it creates `.agents/` there and clones the boilerplate into `<target-directory>`. Since the app is one level below the agent's initial cwd, `cd <target-directory>` before reading app files or running project commands, and confirm `package.json`, `src/`, and `skills/` exist.

Then verify the baseline:

```bash
npm run build-local
npm run test
```

Setup and verification commands are hard gates. Do not continue to mapping or implementation work until the baseline is fixed.

## Working Rules

- Use the verified clone as the source of truth. Inspect current files before making claims or edits.
- Keep changes minimal. Do not reformat unrelated files.
- Preserve `src/components/DemoBadge.tsx` and its layout usage. Also preserve `src/app/[locale]/(auth)/dashboard/page.tsx`.
- Use marketing routes only for promotional content.
- Build product workflows as dedicated authenticated dashboard feature pages, not in the dashboard index: use `src/app/[locale]/(auth)/dashboard/<feature>/page.tsx` for CRUD, data entry, tools, and customer-specific views.

## Project Conventions

- Keep the existing stack and patterns unless the user explicitly asks to replace them: Next.js App Router, TypeScript, React, Tailwind CSS, Shadcn/Radix UI, Clerk, Drizzle ORM, T3 Env, next-intl, LogTape, Vitest, Storybook, and Playwright.
- Add environment variables through `src/libs/Env.ts`; avoid direct `process.env` except in bootstrapping or instrumentation.
- Put user-visible copy in every supported locale file.
- Prefer existing Clerk account and organization features before custom auth flows.
- Follow nearby style and import conventions.
- Run `npm run db:generate` whenever `src/models/Schema.ts` changes.
- Make new components visually polished and consistent with the current UI: reuse existing Shadcn/Radix primitives, Tailwind tokens, spacing, typography, states, and responsive patterns before introducing new visual treatments.
- React Compiler is enabled, so don't add `useMemo` or `useCallback`.

## MVP Scope

- Default to a first-version MVP unless the user asks for more.
- Build the smallest runnable core workflow.
- Defer nonessential architecture, integrations, and edge cases.
- Leave the app runnable with `npm run dev` and complete final verification after each change.

## Final Verification Gate

After building the SaaS based on the user's intent and making all necessary changes, run `npm run lint`, then rerun the baseline verification sequence.

## Gate Failure Handling

When a gate fails, inspect and fix the cause. Change tests only when stale or incorrect. Rerun the gate commands until they pass. If a gate fails after all fixes, report the command, exit status, and relevant output to the user.

## Common Extension Points

Use these as starting search targets:

- General SaaS settings: `src/utils/AppConfig.ts`
- Locales and i18n: `src/locales/en.json`, `src/locales/fr.json`
- Database schema: `src/models/Schema.ts`
- Marketing: `src/app/[locale]/(marketing)`
- User dashboard overview: `src/app/[locale]/(auth)/dashboard/page.tsx`
- Product feature pages: `src/app/[locale]/(auth)/dashboard/<feature>/page.tsx`

## Mapping Heuristics

- Use a tenant only for the top-level organization a user can join and switch between, where membership, permissions, billing, collaboration, or data isolation are scoped.
- Model sub-entities as Drizzle records scoped by a single `ownerId` field.
- Prefer existing Clerk and boilerplate features before custom flows.

## Workflow

After the mandatory baseline gate passes:

1. Identify the requested SaaS change and infer only the product context needed to implement it.
2. Inspect the verified clone for relevant patterns.
3. Implement the change directly in the cloned project, following the route boundaries above.
4. Produce planning output only when the user asks for it or the change needs clarification.
5. Ask the user to run `npm run dev` to let them play with the current state of the SaaS.
