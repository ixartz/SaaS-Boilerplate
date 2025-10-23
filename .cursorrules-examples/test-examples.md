# Testing Examples

## Unit Test Examples
```tsx
/**
 * Button Component Unit Tests
 * 
 * @file src/components/ui/Button.test.tsx
 * @description Comprehensive unit tests for the Button component
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { vi } from 'vitest';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled Button
      </Button>
    );
    
    fireEvent.click(screen.getByText('Disabled Button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('has correct accessibility attributes', () => {
    render(<Button aria-label="Submit form">Submit</Button>);
    
    const button = screen.getByRole('button', { name: 'Submit form' });
    expect(button).toBeInTheDocument();
  });

  it('shows loading state correctly', () => {
    render(<Button loading>Loading...</Button>);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

## Form Component Tests
```tsx
/**
 * User Form Component Tests
 * 
 * @file src/components/forms/UserForm.test.tsx
 * @description Tests for UserForm component with validation
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserForm } from './UserForm';
import { vi } from 'vitest';

describe('UserForm', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders form fields correctly', () => {
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
  });

  it('shows validation errors for invalid input', async () => {
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
    });
  });

  it('calls onSubmit with valid data', async () => {
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'John Doe' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        name: 'John Doe',
        age: undefined
      });
    });
  });

  it('shows loading state when submitting', () => {
    render(<UserForm onSubmit={mockOnSubmit} isLoading={true} />);
    
    expect(screen.getByText('Submitting...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

## E2E Test Examples
```tsx
/**
 * Authentication End-to-End Tests
 * 
 * @file tests/e2e/auth.e2e.ts
 * @description Comprehensive E2E tests for authentication flows
 */

import { test, expect } from '@playwright/test';

describe('Authentication', () => {
  test('user can sign in with valid credentials', async ({ page }) => {
    await page.goto('/sign-in');
    await page.waitForLoadState('networkidle');
    
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="sign-in-button"]');
    
    await page.waitForURL('/dashboard');
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('shows error message for invalid credentials', async ({ page }) => {
    await page.goto('/sign-in');
    
    await page.fill('[data-testid="email-input"]', 'invalid@example.com');
    await page.fill('[data-testid="password-input"]', 'wrongpassword');
    await page.click('[data-testid="sign-in-button"]');
    
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText(
      'Invalid credentials'
    );
  });

  test('user can create new account', async ({ page }) => {
    await page.goto('/sign-up');
    
    await page.fill('[data-testid="email-input"]', 'newuser@example.com');
    await page.fill('[data-testid="password-input"]', 'newpassword123');
    await page.fill('[data-testid="confirm-password-input"]', 'newpassword123');
    await page.fill('[data-testid="name-input"]', 'New User');
    await page.click('[data-testid="sign-up-button"]');
    
    await expect(page).toHaveURL('/verify-email');
    await expect(page.locator('[data-testid="verification-message"]')).toBeVisible();
  });

  test('user can reset password', async ({ page }) => {
    await page.goto('/forgot-password');
    
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.click('[data-testid="reset-password-button"]');
    
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="success-message"]')).toContainText(
      'Password reset email sent'
    );
  });

  test('user can sign out successfully', async ({ page }) => {
    // First sign in
    await page.goto('/sign-in');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="sign-in-button"]');
    await page.waitForURL('/dashboard');
    
    // Sign out
    await page.click('[data-testid="user-menu"]');
    await page.click('[data-testid="sign-out-button"]');
    
    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-testid="sign-in-link"]')).toBeVisible();
  });
});
```

## API Route Tests
```tsx
/**
 * API Route Tests
 * 
 * @file src/app/api/users/route.test.ts
 * @description Tests for user API routes
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, POST } from './route';

// Mock the database functions
vi.mock('@/lib/database/users', () => ({
  getAllUsers: vi.fn(),
  createUser: vi.fn(),
}));

describe('/api/users', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/users', () => {
    it('returns users with pagination', async () => {
      const mockUsers = [
        { id: '1', email: 'user1@example.com', name: 'User 1' },
        { id: '2', email: 'user2@example.com', name: 'User 2' },
      ];

      const { getAllUsers } = await import('@/lib/database/users');
      vi.mocked(getAllUsers).mockResolvedValue(mockUsers);

      const request = new NextRequest('http://localhost:3000/api/users?page=1&limit=10');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.users).toEqual(mockUsers);
      expect(data.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 2
      });
    });

    it('handles database errors gracefully', async () => {
      const { getAllUsers } = await import('@/lib/database/users');
      vi.mocked(getAllUsers).mockRejectedValue(new Error('Database error'));

      const request = new NextRequest('http://localhost:3000/api/users');
      const response = await GET(request);

      expect(response.status).toBe(500);
    });
  });

  describe('POST /api/users', () => {
    it('creates a new user successfully', async () => {
      const mockUser = { id: '1', email: 'new@example.com', name: 'New User' };
      const { createUser } = await import('@/lib/database/users');
      vi.mocked(createUser).mockResolvedValue(mockUser);

      const request = new NextRequest('http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify({
          email: 'new@example.com',
          name: 'New User'
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toEqual(mockUser);
    });

    it('validates user data before creating', async () => {
      const request = new NextRequest('http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify({
          email: 'invalid-email',
          name: 'User'
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(400);
    });
  });
});
```

## Database Tests
```tsx
/**
 * Database Function Tests
 * 
 * @file src/lib/database/users.test.ts
 * @description Tests for database operations
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUserById, createUser, updateUser } from './users';
import { db } from '@/libs/DB';

// Mock the database
vi.mock('@/libs/DB', () => ({
  db: {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  }
}));

describe('Database Operations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUserById', () => {
    it('returns user when found', async () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' };
      
      const mockSelect = vi.fn().mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue([mockUser])
          })
        })
      });

      vi.mocked(db.select).mockImplementation(mockSelect);

      const result = await getUserById('1');
      expect(result).toEqual(mockUser);
    });

    it('returns null when user not found', async () => {
      const mockSelect = vi.fn().mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue([])
          })
        })
      });

      vi.mocked(db.select).mockImplementation(mockSelect);

      const result = await getUserById('nonexistent');
      expect(result).toBeNull();
    });

    it('throws error for invalid ID', async () => {
      await expect(getUserById('')).rejects.toThrow('Invalid user ID provided');
      await expect(getUserById(null as any)).rejects.toThrow('Invalid user ID provided');
    });
  });

  describe('createUser', () => {
    it('creates user successfully', async () => {
      const userData = { email: 'new@example.com', name: 'New User' };
      const mockUser = { id: '1', ...userData, createdAt: new Date(), updatedAt: new Date() };

      const mockInsert = vi.fn().mockReturnValue({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([mockUser])
        })
      });

      vi.mocked(db.insert).mockImplementation(mockInsert);

      const result = await createUser(userData);
      expect(result).toEqual(mockUser);
    });
  });
});
```
