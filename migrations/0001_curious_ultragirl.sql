CREATE TABLE IF NOT EXISTS "google_business_connections" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerk_user_id" text NOT NULL,
	"organization_id" text,
	"google_account_id" text NOT NULL,
	"google_account_name" text,
	"google_account_email" text,
	"google_role" text,
	"access_token" text,
	"refresh_token" text,
	"token_expiry" timestamp,
	"scopes" text,
	"connected_at" timestamp,
	"revoked_at" timestamp,
	"status" text DEFAULT 'active',
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "google_business_locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"location_id" text NOT NULL,
	"account_id" text NOT NULL,
	"location_name" text,
	"store_code" text,
	"is_verified" boolean DEFAULT false NOT NULL,
	"can_post" boolean DEFAULT false NOT NULL,
	"can_reply_reviews" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "gb_connections_account_user_idx" ON "google_business_connections" USING btree ("google_account_id","clerk_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "gb_locations_location_idx" ON "google_business_locations" USING btree ("location_id");