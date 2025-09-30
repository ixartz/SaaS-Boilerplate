-- Add thumbnail_url column to projects table if it doesn't exist
ALTER TABLE "projects" 
ADD COLUMN IF NOT EXISTS "thumbnail_url" text;

-- Add index for thumbnail_url
CREATE INDEX IF NOT EXISTS "idx_projects_thumbnail_url" ON "projects"("thumbnail_url");

