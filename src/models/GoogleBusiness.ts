import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

// Google Business account connection (multi-client / multi-account)
export const googleBusinessConnections = pgTable(
  'google_business_connections',
  {
    id: serial('id').primaryKey(),

    // SaaS context
    clerkUserId: text('clerk_user_id').notNull(),
    organizationId: text('organization_id'),

    // Google account data
    googleAccountId: text('google_account_id').notNull(),
    googleAccountName: text('google_account_name'),
    googleAccountEmail: text('google_account_email'),
    googleRole: text('google_role'), // OWNER / MANAGER / ...

    // OAuth tokens (encrypted **outside** DB)
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    tokenExpiry: timestamp('token_expiry', { mode: 'date' }),
    scopes: text('scopes'),

    // Lifecycle
    connectedAt: timestamp('connected_at', { mode: 'date' }),
    revokedAt: timestamp('revoked_at', { mode: 'date' }),
    status: text('status').default('active'), // active / expired / revoked
    permissionStatus: text('permission_status').default('insufficient_permission'), // valid_admin / valid_manager / insufficient_permission / revoked / token_expired

    // housekeeping
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => {
    return {
      accountIdx: uniqueIndex('gb_connections_account_user_idx').on(
        table.googleAccountId,
        table.clerkUserId,
      ),
    };
  },
);

// Google Business Locations under a given account
export const googleBusinessLocations = pgTable(
  'google_business_locations',
  {
    id: serial('id').primaryKey(),

    locationId: text('location_id').notNull(),
    accountId: text('account_id')
      .notNull(),
    // In a full setup we would reference googleBusinessConnections.googleAccountId

    locationName: text('location_name'),
    storeCode: text('store_code'),

    isVerified: boolean('is_verified').default(false).notNull(),
    canPost: boolean('can_post').default(false).notNull(),
    canReplyReviews: boolean('can_reply_reviews').default(false).notNull(),

    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => {
    return {
      locationIdx: uniqueIndex('gb_locations_location_idx').on(table.locationId),
    };
  },
);
