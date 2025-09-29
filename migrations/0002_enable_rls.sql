-- Enable Row Level Security (RLS) for all domain tables
-- This ensures multi-tenant data isolation

-- Enable RLS on all domain tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_log_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_links ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for org_id isolation
-- Policy: Users can only access data from their current organization

-- Projects RLS Policy
CREATE POLICY "projects_org_isolation" ON projects
  FOR ALL
  USING (org_id = current_setting('app.current_org')::text);

-- Categories RLS Policy
CREATE POLICY "categories_org_isolation" ON categories
  FOR ALL
  USING (org_id = current_setting('app.current_org')::text);

-- Tasks RLS Policy
CREATE POLICY "tasks_org_isolation" ON tasks
  FOR ALL
  USING (org_id = current_setting('app.current_org')::text);

-- Daily Logs RLS Policy
CREATE POLICY "daily_logs_org_isolation" ON daily_logs
  FOR ALL
  USING (org_id = current_setting('app.current_org')::text);

-- Daily Log Tasks RLS Policy
CREATE POLICY "daily_log_tasks_org_isolation" ON daily_log_tasks
  FOR ALL
  USING (org_id = current_setting('app.current_org')::text);

-- Media Assets RLS Policy
CREATE POLICY "media_assets_org_isolation" ON media_assets
  FOR ALL
  USING (org_id = current_setting('app.current_org')::text);

-- Transactions RLS Policy
CREATE POLICY "transactions_org_isolation" ON transactions
  FOR ALL
  USING (org_id = current_setting('app.current_org')::text);

-- Share Links RLS Policy
CREATE POLICY "share_links_org_isolation" ON share_links
  FOR ALL
  USING (org_id = current_setting('app.current_org')::text);

-- Grant necessary permissions for RLS to work
-- Note: These permissions should be granted to the application user
-- GRANT SELECT, INSERT, UPDATE, DELETE ON projects TO app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON categories TO app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON tasks TO app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON daily_logs TO app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON daily_log_tasks TO app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON media_assets TO app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON transactions TO app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON share_links TO app_user;
