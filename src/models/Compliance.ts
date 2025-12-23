import {
  pgTable,
  serial,
  text,
  timestamp,
  json,
} from 'drizzle-orm/pg-core';

/**
 * Registro de consentimento dos usuários.
 * Útil para LGPD / GDPR.
 */
export const consentLogs = pgTable('consent_logs', {
  id: serial('id').primaryKey(),

  clerkUserId: text('clerk_user_id').notNull(),
  organizationId: text('organization_id'),

  consentType: text('consent_type').notNull(), // ex: google_business, marketing_email
  consentText: text('consent_text'), // snapshot do texto exibido
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),

  grantedAt: timestamp('granted_at', { mode: 'date' }).defaultNow().notNull(),
  revokedAt: timestamp('revoked_at', { mode: 'date' }),
});

/**
 * Log de ações executadas pela API externa em nome do usuário.
 */
export const apiActionLogs = pgTable('api_action_logs', {
  id: serial('id').primaryKey(),

  clerkUserId: text('clerk_user_id').notNull(),
  organizationId: text('organization_id'),

  externalService: text('external_service').notNull(), // ex: google_business
  endpoint: text('endpoint').notNull(), // /v1/locations/123/posts
  action: text('action').notNull(), // GET / POST / DELETE
  statusCode: text('status_code'),

  requestPayload: json('request_payload'),
  responsePayload: json('response_payload'),

  executedAt: timestamp('executed_at', { mode: 'date' }).defaultNow().notNull(),
});
