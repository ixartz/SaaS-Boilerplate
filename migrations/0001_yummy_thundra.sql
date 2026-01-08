CREATE TABLE IF NOT EXISTS "user_usage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(128) NOT NULL,
	"month" varchar(7) NOT NULL,
	"videos_created" integer DEFAULT 0,
	"storage_used" integer DEFAULT 0,
	"export_count" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "video_edits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"edit_data" json NOT NULL,
	"version" integer DEFAULT 1,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "video_projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(128) NOT NULL,
	"organization_id" varchar(128),
	"name" varchar(255) NOT NULL,
	"description" text,
	"thumbnail_url" varchar(512),
	"duration" integer,
	"file_size" integer,
	"resolution" varchar(20),
	"status" varchar(20) DEFAULT 'draft',
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "video_edits" ADD CONSTRAINT "video_edits_project_id_video_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."video_projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
