# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
- `npm run dev` - Start development server with Sentry Spotlight
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run clean` - Remove build artifacts

### Database
- `npm run db:generate` - Generate migration files after schema changes in `/src/models/Schema.ts`
- `npm run db:migrate` - Run migrations (requires DATABASE_URL env var)
- `npm run db:studio` - Open Drizzle Studio for database management

### Testing
- `npm run test` - Run unit tests with Vitest
- `npm run test -- --watch` - Run tests in watch mode
- `npm run test -- src/components/Button.test.tsx` - Run specific test file
- `npm run test:e2e` - Run Playwright E2E tests (run `npx playwright install` first)
- `npm run test:e2e -- --headed` - Run E2E tests with browser UI

### Code Quality
- `npm run lint` - Check code with ESLint
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run check-types` - TypeScript type checking
- `npm run commit` - Use Commitizen for conventional commits

### Storybook
- `npm run storybook` - Start Storybook dev server (port 6006)
- `npm run build-stats` - Analyze bundle sizes

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14 with App Router, React 18, TypeScript
- **Styling**: Tailwind CSS with Shadcn UI components
- **Database**: Drizzle ORM (PostgreSQL/SQLite/MySQL)
- **Auth**: Clerk (passwordless, MFA, social auth, multi-tenancy)
- **Payments**: Stripe subscriptions
- **I18n**: next-intl with Crowdin
- **Testing**: Vitest (unit), Playwright (E2E)
- **Monitoring**: Sentry, Pino.js logging, Checkly uptime

### Project Structure
```
src/
├── app/                    # Next.js App Router pages with i18n
│   └── [locale]/          # Internationalized routes
├── components/            # Reusable UI components
├── features/             # Feature-specific components
│   ├── auth/            # Authentication flows
│   ├── billing/         # Stripe subscription management
│   ├── dashboard/       # User/org dashboards
│   └── landing/         # Landing page components
├── templates/           # Page templates
├── models/              # Database models
│   └── Schema.ts       # Drizzle ORM schema definitions
├── libs/               # Third-party integrations
│   ├── DB.ts          # Database connection
│   ├── Env.ts         # Type-safe env vars
│   └── Stripe.ts      # Stripe configuration
└── utils/
    └── AppConfig.ts   # App configuration (pricing, locales)
```

### Key Patterns

#### Database Schema Modifications
When modifying database schema:
1. Edit `/src/models/Schema.ts`
2. Run `npm run db:generate` to create migration
3. Run `npm run db:migrate` to apply changes

#### Environment Variables
- Development: `.env.local` (gitignored)
- Production: Set in deployment platform
- Type-safe access via `src/libs/Env.ts`

#### Multi-tenancy
- Users belong to organizations via `organizationUsers` table
- Check organization access with Clerk's `auth().orgId`
- Organization-scoped queries filter by `organizationId`

#### Internationalization
- Locales defined in `src/utils/AppConfig.ts`
- Translations in `src/locales/[locale].json`
- Use `useTranslations()` hook from next-intl

#### Form Handling
- Use React Hook Form with Zod validation
- See examples in `src/features/auth/` and `src/features/billing/`

#### API Routes
- Located in `src/app/api/`
- Stripe webhook: `/api/stripe/webhook`
- Use Clerk's `auth()` for authentication

#### Testing Strategy
- Unit tests: Component logic and utilities
- E2E tests: Critical user flows (auth, billing)
- Visual regression: Percy integration in CI

### Security Considerations
- All database queries are parameterized (Drizzle ORM)
- Environment variables validated at runtime
- Clerk handles auth security (JWT, session management)
- Stripe webhook signature verification implemented
- CSRF protection via Next.js built-in features

### Performance Optimizations
- Static pages pre-rendered at build time
- Dynamic imports for code splitting
- Image optimization with next/image
- Database connection pooling
- Edge runtime compatible where possible
