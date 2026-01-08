import {
  bigint,
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

// This file defines the structure of your database tables using the Drizzle ORM.

// To modify the database schema:
// 1. Update this file with your desired changes.
// 2. Generate a new migration by running: `npm run db:generate`

// The generated migration file will reflect your schema changes.
// The migration is automatically applied during the next database interaction,
// so there's no need to run it manually or restart the Next.js server.

// Need a database for production? Check out https://www.prisma.io/?via=saasboilerplatesrc
// Tested and compatible with Next.js Boilerplate
export const organizationSchema = pgTable(
  'organization',
  {
    id: text('id').primaryKey(),
    stripeCustomerId: text('stripe_customer_id'),
    stripeSubscriptionId: text('stripe_subscription_id'),
    stripeSubscriptionPriceId: text('stripe_subscription_price_id'),
    stripeSubscriptionStatus: text('stripe_subscription_status'),
    stripeSubscriptionCurrentPeriodEnd: bigint(
      'stripe_subscription_current_period_end',
      { mode: 'number' },
    ),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => {
    return {
      stripeCustomerIdIdx: uniqueIndex('stripe_customer_id_idx').on(
        table.stripeCustomerId,
      ),
    };
  },
);

export const todoSchema = pgTable('todo', {
  id: serial('id').primaryKey(),
  ownerId: text('owner_id').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Video Editor Tables
export const videoProjectsSchema = pgTable('video_projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: varchar('user_id', { length: 128 }).notNull(),
  organizationId: varchar('organization_id', { length: 128 }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  thumbnailUrl: varchar('thumbnail_url', { length: 512 }),
  duration: integer('duration'), // in seconds
  fileSize: integer('file_size'), // in bytes
  resolution: varchar('resolution', { length: 20 }), // e.g., "1920x1080"
  status: varchar('status', { length: 20 }).default('draft'), // draft, processing, completed
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const videoEditsSchema = pgTable('video_edits', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id')
    .references(() => videoProjectsSchema.id, { onDelete: 'cascade' })
    .notNull(),
  editData: json('edit_data').notNull(), // MediaBunny command history
  version: integer('version').default(1),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const userUsageSchema = pgTable('user_usage', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: varchar('user_id', { length: 128 }).notNull(),
  month: varchar('month', { length: 7 }).notNull(), // e.g., "2026-01"
  videosCreated: integer('videos_created').default(0),
  storageUsed: integer('storage_used').default(0), // in bytes
  exportCount: integer('export_count').default(0),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

