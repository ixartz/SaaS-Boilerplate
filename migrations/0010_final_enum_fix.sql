-- Final enum fix for Vercel deployment
DO $$ BEGIN
  CREATE TYPE "public"."log_task_status" AS ENUM('WAITING', 'IN_PROGRESS', 'DONE', 'CANCELLED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."project_status" AS ENUM('PLANNING', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."task_status" AS ENUM('WAITING', 'IN_PROGRESS', 'DONE', 'CANCELLED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."media_kind" AS ENUM('IMAGE', 'VIDEO', 'DOCUMENT', 'AUDIO');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."transaction_type" AS ENUM('ADVANCE', 'EXPENSE');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
