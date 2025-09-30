# Phase 4.A.1 – Dashboard Shell Layout (Redo)

## Summary
- Rebuilt canonical layout skeleton for authenticated routes (`Header`, `Sidebar`, `main`).
- Added Clerk E2E bypass support using headers (`x-e2e-bypass`, `x-e2e-user`, `x-e2e-org`) gated by `CLERK_E2E`.
- Updated middleware and `requireMembership` to accept fake user/org IDs during tests.
- Simplified Playwright fixtures and tests to set the bypass headers explicitly.
- Ensured sign-in pages do not redirect when bypass headers are present.

## Verification
```
pnpm lint
pnpm check-types
pnpm test:e2e
```
All commands pass with `CLERK_E2E=true` and `E2E_AUTH_BYPASS=1`.

## Notes
- Prefetch cookie storage (`tests/e2e/storageState.json`) is used when `E2E_AUTH_BYPASS=1` in Playwright config.
- `Header`/`Sidebar` remain fully functional in production; bypass logic only applies when env flag is set.
