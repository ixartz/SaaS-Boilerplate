-- Fix organization table to add required columns
-- This migration adds name and slug columns to existing organization table

-- Add name and slug columns with default values
ALTER TABLE organization 
ADD COLUMN name VARCHAR(255) DEFAULT 'Default Organization',
ADD COLUMN slug VARCHAR(100) DEFAULT 'default-org';

-- Update existing records with proper values
UPDATE organization 
SET 
  name = 'SiteFlow Organization',
  slug = 'siteflow-org'
WHERE name = 'Default Organization';

-- Make columns NOT NULL after setting values
ALTER TABLE organization 
ALTER COLUMN name SET NOT NULL,
ALTER COLUMN slug SET NOT NULL;

-- Add unique constraint for slug
CREATE UNIQUE INDEX organization_slug_idx ON organization(slug);
