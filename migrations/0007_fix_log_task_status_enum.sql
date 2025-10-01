-- Fix log_task_status enum
DO $$ BEGIN
  CREATE TYPE "public"."log_task_status" AS ENUM('WAITING', 'IN_PROGRESS', 'DONE', 'CANCELLED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
