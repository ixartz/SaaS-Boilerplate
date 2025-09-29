-- Create RBAC tables: users, memberships
-- This migration creates the user management and role-based access control tables

-- Create role_enum type
CREATE TYPE role_enum AS ENUM (
  'OWNER',
  'ADMIN', 
  'PM',
  'ENGINEER',
  'ACCOUNTANT',
  'VIEWER'
);

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  display_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for users table
CREATE UNIQUE INDEX users_clerk_user_id_idx ON users(clerk_user_id);
CREATE INDEX users_email_idx ON users(email);

-- Create memberships table
CREATE TABLE memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  org_id TEXT NOT NULL REFERENCES organization(id) ON DELETE CASCADE,
  role role_enum NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for memberships table
CREATE UNIQUE INDEX memberships_user_org_idx ON memberships(user_id, org_id);
CREATE INDEX memberships_user_id_idx ON memberships(user_id);
CREATE INDEX memberships_org_id_idx ON memberships(org_id);
CREATE INDEX memberships_role_idx ON memberships(role);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_memberships_updated_at BEFORE UPDATE ON memberships
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
