# Database Query Examples

## User Database Operations
```tsx
/**
 * Database Query Functions
 * 
 * @file src/lib/database/users.ts
 * @description User-related database operations using Drizzle ORM
 */

import { db } from '@/libs/DB';
import { users } from '@/models/Schema';
import { eq, and, desc, like, count } from 'drizzle-orm';
import type { User } from '@/types/User';

/**
 * Retrieves a user by their unique ID
 * 
 * @function getUserById
 * @param id - Unique user identifier
 * @returns Promise<User | null> - User object or null if not found
 */
export async function getUserById(id: string): Promise<User | null> {
  try {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid user ID provided');
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    
    return user[0] || null;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

/**
 * Retrieves all users with pagination support
 * 
 * @function getAllUsers
 * @param limit - Maximum number of users to return
 * @param offset - Number of users to skip
 * @param search - Search term for filtering users
 * @returns Promise<User[]> - Array of user objects
 */
export async function getAllUsers(
  limit = 10, 
  offset = 0, 
  search = ''
): Promise<User[]> {
  try {
    const query = db
      .select()
      .from(users)
      .orderBy(desc(users.createdAt))
      .limit(limit)
      .offset(offset);

    if (search) {
      query.where(
        or(
          like(users.firstName, `%${search}%`),
          like(users.lastName, `%${search}%`),
          like(users.email, `%${search}%`)
        )
      );
    }
    
    return await query;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

/**
 * Creates a new user in the database
 * 
 * @function createUser
 * @param userData - User data to create
 * @returns Promise<User> - Created user object
 */
export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  try {
    const [user] = await db
      .insert(users)
      .values({
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

/**
 * Updates an existing user
 * 
 * @function updateUser
 * @param id - User ID to update
 * @param userData - Updated user data
 * @returns Promise<User> - Updated user object
 */
export async function updateUser(id: string, userData: Partial<User>): Promise<User> {
  try {
    const [user] = await db
      .update(users)
      .set({
        ...userData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();
    
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

/**
 * Deletes a user from the database
 * 
 * @function deleteUser
 * @param id - User ID to delete
 * @returns Promise<void>
 */
export async function deleteUser(id: string): Promise<void> {
  try {
    await db
      .delete(users)
      .where(eq(users.id, id));
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}
```

## Database Schema Example
```tsx
/**
 * User table schema definition
 * 
 * @file src/models/Schema.ts
 * @description Database schema definitions using Drizzle ORM
 */

import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

/**
 * User table schema definition
 * 
 * @description Stores user account information and authentication data
 * @table users
 * @index email (unique) - For fast email lookups during authentication
 * @index clerk_id (unique) - For Clerk authentication integration
 */
export const users = pgTable('users', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  clerkId: text('clerk_id').notNull().unique(), // Clerk user ID for authentication
  email: text('email').notNull().unique(), // User's email address
  firstName: text('first_name'), // User's first name
  lastName: text('last_name'), // User's last name
  imageUrl: text('image_url'), // Profile image URL from Clerk
  createdAt: timestamp('created_at').defaultNow(), // Account creation timestamp
  updatedAt: timestamp('updated_at').defaultNow(), // Last update timestamp
});

/**
 * Organization table schema definition
 * 
 * @description Stores organization information for multi-tenancy
 * @table organizations
 */
export const organizations = pgTable('organizations', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  name: text('name').notNull(), // Organization name
  slug: text('slug').notNull().unique(), // URL-friendly organization identifier
  description: text('description'), // Organization description
  ownerId: text('owner_id').notNull().references(() => users.id), // Organization owner
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

/**
 * Organization membership table
 * 
 * @description Links users to organizations with roles
 * @table organization_memberships
 */
export const organizationMemberships = pgTable('organization_memberships', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  userId: text('user_id').notNull().references(() => users.id),
  organizationId: text('organization_id').notNull().references(() => organizations.id),
  role: text('role').notNull().default('member'), // member, admin, owner
  createdAt: timestamp('created_at').defaultNow(),
});
```

## Database Migration Example
```tsx
/**
 * Database Migration Example
 * 
 * @file migrations/0001_add_organizations.sql
 * @description Example database migration for adding organizations
 */

-- Create organizations table
CREATE TABLE IF NOT EXISTS "organizations" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "description" text,
  "owner_id" text NOT NULL,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

-- Create organization_memberships table
CREATE TABLE IF NOT EXISTS "organization_memberships" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL,
  "organization_id" text NOT NULL,
  "role" text NOT NULL DEFAULT 'member',
  "created_at" timestamp DEFAULT now()
);

-- Add foreign key constraints
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_owner_id_users_id_fk" 
  FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE;

ALTER TABLE "organization_memberships" ADD CONSTRAINT "organization_memberships_user_id_users_id_fk" 
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;

ALTER TABLE "organization_memberships" ADD CONSTRAINT "organization_memberships_organization_id_organizations_id_fk" 
  FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE;

-- Create indexes for better performance
CREATE INDEX "organizations_slug_idx" ON "organizations" ("slug");
CREATE INDEX "organization_memberships_user_id_idx" ON "organization_memberships" ("user_id");
CREATE INDEX "organization_memberships_organization_id_idx" ON "organization_memberships" ("organization_id");
```
