# API Route Examples

## User Management API
```tsx
/**
 * User Management API Routes
 * 
 * @file src/app/api/users/route.ts
 * @description RESTful API endpoints for user management
 */

import { NextRequest, NextResponse } from 'next/server';
import { getUserById, createUser, updateUser } from '@/lib/database/users';
import { validateUserData } from '@/lib/validation/user';

/**
 * GET /api/users - Retrieve all users with pagination
 * 
 * @route GET /api/users
 * @param request - Next.js request object
 * @returns Promise<NextResponse> - JSON response with user data
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const users = await getAllUsers(limit, (page - 1) * limit, search);
    
    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total: users.length
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users - Create a new user
 * 
 * @route POST /api/users
 * @param request - Next.js request object
 * @returns Promise<NextResponse> - JSON response with created user
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = validateUserData(body);
    
    const user = await createUser(validatedData);
    
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 400 }
    );
  }
}
```

## Dynamic User API Route
```tsx
/**
 * Dynamic User API Route
 * 
 * @file src/app/api/users/[id]/route.ts
 * @description API endpoints for individual user operations
 */

import { NextRequest, NextResponse } from 'next/server';
import { getUserById, updateUser, deleteUser } from '@/lib/database/users';

/**
 * GET /api/users/[id] - Retrieve user by ID
 * 
 * @route GET /api/users/[id]
 * @param request - Next.js request object
 * @param params - Route parameters containing user ID
 * @returns Promise<NextResponse> - JSON response with user data
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserById(params.id);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/users/[id] - Update user by ID
 * 
 * @route PUT /api/users/[id]
 * @param request - Next.js request object
 * @param params - Route parameters containing user ID
 * @returns Promise<NextResponse> - JSON response with updated user
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const user = await updateUser(params.id, body);
    
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/users/[id] - Delete user by ID
 * 
 * @route DELETE /api/users/[id]
 * @param request - Next.js request object
 * @param params - Route parameters containing user ID
 * @returns Promise<NextResponse> - JSON response confirming deletion
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteUser(params.id);
    
    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
```

## Authentication API Route
```tsx
/**
 * Authentication API Route
 * 
 * @file src/app/api/auth/route.ts
 * @description Authentication endpoints using Clerk
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

/**
 * GET /api/auth/me - Get current user
 * 
 * @route GET /api/auth/me
 * @param request - Next.js request object
 * @returns Promise<NextResponse> - JSON response with user data
 */
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Fetch user data from database
    const user = await getUserById(userId);
    
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
```
