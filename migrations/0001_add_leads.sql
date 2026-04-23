CREATE TABLE IF NOT EXISTS "lead" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"company" text,
	"role" text,
	"use_case" text,
	"source" text NOT NULL,
	"referrer" text,
	"utm" text,
	"user_agent" text,
	"ip_hash" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
