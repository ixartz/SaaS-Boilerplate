# Security Implementation Examples

## Environment Variables Security
```typescript
/**
 * Environment Variables Security Configuration
 * 
 * @file src/libs/env.ts
 * @description Type-safe environment variable validation with security requirements
 */

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

// All sensitive environment variables MUST be encrypted
// Use @t3-oss/env-nextjs for type-safe validation
const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    JWT_SECRET: z.string().min(32), // Minimum 32 characters
    ENCRYPTION_KEY: z.string().length(32), // Exactly 32 characters
    STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
    CLERK_SECRET_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: process.env,
});

export { env };
```

## Database Security
```typescript
/**
 * Secure Database Query Examples
 * 
 * @file src/lib/database/secure-queries.ts
 * @description Secure database operations with parameterized queries
 */

import { db } from '@/libs/DB';
import { users } from '@/models/Schema';
import { eq } from 'drizzle-orm';

/**
 * Secure user retrieval with parameterized queries
 * 
 * @function getUserById
 * @param id - User ID to retrieve
 * @returns Promise<User | null> - User object or null
 * 
 * @description
 * SECURE: Uses parameterized queries to prevent SQL injection
 * NEVER use string concatenation for SQL queries
 */
export async function getUserById(id: string): Promise<User | null> {
  // ✅ SECURE: Parameterized query
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  
  // ❌ INSECURE: String concatenation (NEVER DO THIS)
  // const query = `SELECT * FROM users WHERE id = '${id}'`;
  
  return user[0] || null;
}

/**
 * Secure user search with input validation
 * 
 * @function searchUsers
 * @param searchTerm - Search term to validate
 * @returns Promise<User[]> - Array of matching users
 */
export async function searchUsers(searchTerm: string): Promise<User[]> {
  // Validate and sanitize input
  const sanitizedTerm = searchTerm.trim().slice(0, 100); // Limit length
  
  if (!sanitizedTerm || sanitizedTerm.length < 2) {
    return [];
  }
  
  // Use parameterized query with LIKE operator
  return await db
    .select()
    .from(users)
    .where(like(users.email, `%${sanitizedTerm}%`))
    .limit(50); // Limit results
}
```

## Input Validation & Sanitization
```typescript
/**
 * Security-Focused Input Validation
 * 
 * @file src/lib/validation/security.ts
 * @description Comprehensive input validation and sanitization
 */

import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

/**
 * Financial transaction validation schema
 * 
 * @description Strict validation for financial transactions with security limits
 */
export const financialTransactionSchema = z.object({
  amount: z.number().positive().max(1000000), // Maximum transaction limit
  currency: z.enum(['USD', 'EUR', 'GBP']),
  accountNumber: z.string().regex(/^\d{8,12}$/),
  routingNumber: z.string().regex(/^\d{9}$/),
  description: z.string().max(255).regex(/^[a-zA-Z0-9\s\-.,]+$/), // Alphanumeric only
});

/**
 * User profile validation schema
 * 
 * @description Strict validation for user profile data
 */
export const userProfileSchema = z.object({
  firstName: z.string().min(2).max(50).regex(/^[a-zA-Z\s]+$/),
  lastName: z.string().min(2).max(50).regex(/^[a-zA-Z\s]+$/),
  ssn: z.string().regex(/^\d{3}-\d{2}-\d{4}$/), // SSN format validation
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Date format validation
});

/**
 * General user input validation
 * 
 * @description Comprehensive user input validation with security constraints
 */
export const userInputSchema = z.object({
  email: z.string().email().max(255),
  name: z.string().min(2).max(100).regex(/^[a-zA-Z\s]+$/),
  amount: z.number().positive().max(1000000), // Financial limits
  accountNumber: z.string().regex(/^\d{8,12}$/),
});

/**
 * HTML sanitization function
 * 
 * @function sanitizeHtml
 * @param html - HTML string to sanitize
 * @returns string - Sanitized HTML
 * 
 * @description
 * Sanitizes user-generated HTML content to prevent XSS attacks
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong'],
    ALLOWED_ATTR: []
  });
}

/**
 * SQL injection prevention helper
 * 
 * @function escapeSqlString
 * @param str - String to escape
 * @returns string - Escaped string
 * 
 * @description
 * Additional protection against SQL injection (use with parameterized queries)
 */
export function escapeSqlString(str: string): string {
  return str.replace(/'/g, "''").replace(/\\/g, '\\\\');
}
```

## API Security Headers
```typescript
/**
 * Security Headers Configuration
 * 
 * @file next.config.mjs
 * @description Comprehensive security headers for financial application
 */

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.stripe.com;",
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

## Authentication Security
```typescript
/**
 * Secure Authentication Middleware
 * 
 * @file src/middleware.ts
 * @description Authentication and authorization middleware with security controls
 */

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define protected routes for financial operations
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/billing(.*)',
  '/settings(.*)',
  '/api/transactions(.*)',
  '/api/payments(.*)',
  '/api/financial(.*)',
]);

// Define high-security routes requiring additional verification
const isHighSecurityRoute = createRouteMatcher([
  '/api/transactions(.*)',
  '/api/payments(.*)',
  '/api/financial(.*)',
  '/settings/billing(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect({
      // Require email verification for all protected routes
      unverifiedEmail: () => new Response('Email verification required', { status: 403 }),
    });
  }
  
  if (isHighSecurityRoute(req)) {
    auth().protect({
      // Require MFA for high-security financial operations
      unverifiedEmail: () => new Response('Email verification required', { status: 403 }),
      // Add additional MFA checks here
    });
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

## Financial Data Encryption
```typescript
/**
 * Financial Data Encryption
 * 
 * @file src/lib/encryption/financial.ts
 * @description AES-256-GCM encryption for sensitive financial data
 */

import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;
const ALGORITHM = 'aes-256-gcm';

/**
 * Encrypt sensitive financial data
 * 
 * @function encryptFinancialData
 * @param data - Data to encrypt
 * @returns EncryptedData - Encrypted data with IV and tag
 * 
 * @description
 * Uses AES-256-GCM encryption for financial data with authentication
 */
export function encryptFinancialData(data: string): { encrypted: string; iv: string; tag: string } {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(ALGORITHM, ENCRYPTION_KEY);
  cipher.setAAD(Buffer.from('financial-data'));
  
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const tag = cipher.getAuthTag();
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    tag: tag.toString('hex'),
  };
}

/**
 * Decrypt sensitive financial data
 * 
 * @function decryptFinancialData
 * @param encryptedData - Encrypted data object
 * @returns string - Decrypted data
 * 
 * @description
 * Decrypts financial data using AES-256-GCM with authentication verification
 */
export function decryptFinancialData(encryptedData: { encrypted: string; iv: string; tag: string }): string {
  const decipher = crypto.createDecipher(ALGORITHM, ENCRYPTION_KEY);
  decipher.setAAD(Buffer.from('financial-data'));
  decipher.setAuthTag(Buffer.from(encryptedData.tag, 'hex'));
  
  let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

/**
 * Hash sensitive data for storage
 * 
 * @function hashSensitiveData
 * @param data - Data to hash
 * @returns string - Hashed data
 * 
 * @description
 * Creates a secure hash of sensitive data for storage
 */
export function hashSensitiveData(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}
```

## Audit Logging
```typescript
/**
 * Comprehensive Audit Logging
 * 
 * @file src/lib/audit/logger.ts
 * @description Audit logging for all financial operations
 */

import { db } from '@/libs/DB';
import { auditLogs } from '@/models/Schema';

interface AuditLog {
  userId: string;
  action: string;
  resource: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  metadata?: Record<string, any>;
}

/**
 * Log financial action with comprehensive audit trail
 * 
 * @function logFinancialAction
 * @param userId - User performing the action
 * @param action - Action being performed
 * @param resource - Resource being accessed
 * @param metadata - Additional metadata
 * 
 * @description
 * Creates comprehensive audit log for all financial operations
 */
export async function logFinancialAction(
  userId: string,
  action: string,
  resource: string,
  metadata?: Record<string, any>
) {
  const auditLog: AuditLog = {
    userId,
    action,
    resource,
    timestamp: new Date(),
    ipAddress: getClientIP(),
    userAgent: getClientUserAgent(),
    metadata,
  };
  
  // Store in secure audit log database
  await db.insert(auditLogs).values(auditLog);
  
  // Send to security monitoring system
  await sendToSecurityMonitoring(auditLog);
}

/**
 * Log authentication events
 * 
 * @function logAuthEvent
 * @param userId - User ID
 * @param event - Authentication event
 * @param success - Whether the event was successful
 */
export async function logAuthEvent(
  userId: string,
  event: 'login' | 'logout' | 'mfa_success' | 'mfa_failure',
  success: boolean
) {
  await logFinancialAction(
    userId,
    event,
    'authentication',
    { success, timestamp: new Date().toISOString() }
  );
}

/**
 * Log data access events
 * 
 * @function logDataAccess
 * @param userId - User accessing data
 * @param resource - Resource being accessed
 * @param action - Action performed
 */
export async function logDataAccess(
  userId: string,
  resource: string,
  action: 'read' | 'write' | 'delete'
) {
  await logFinancialAction(
    userId,
    action,
    resource,
    { accessType: 'data_access' }
  );
}

// Helper functions
function getClientIP(): string {
  // Implementation to get client IP
  return '127.0.0.1'; // Placeholder
}

function getClientUserAgent(): string {
  // Implementation to get user agent
  return 'Unknown'; // Placeholder
}

async function sendToSecurityMonitoring(auditLog: AuditLog): Promise<void> {
  // Implementation to send to security monitoring system
  console.log('Security monitoring:', auditLog);
}
```

## Rate Limiting
```typescript
/**
 * API Rate Limiting
 * 
 * @file src/lib/rate-limiting/index.ts
 * @description Rate limiting for financial operations
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create rate limiters for different operations
const generalRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
});

const financialRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute for financial operations
});

const authRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 requests per minute for auth operations
});

/**
 * Check rate limit for general operations
 * 
 * @function checkGeneralRateLimit
 * @param identifier - User identifier
 * @returns RateLimitResult - Rate limit result
 */
export async function checkGeneralRateLimit(identifier: string) {
  const { success, limit, reset, remaining } = await generalRateLimit.limit(identifier);
  
  if (!success) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
  
  return { success, limit, reset, remaining };
}

/**
 * Check rate limit for financial operations
 * 
 * @function checkFinancialRateLimit
 * @param identifier - User identifier
 * @returns RateLimitResult - Rate limit result
 */
export async function checkFinancialRateLimit(identifier: string) {
  const { success, limit, reset, remaining } = await financialRateLimit.limit(identifier);
  
  if (!success) {
    throw new Error('Financial operations rate limit exceeded. Please try again later.');
  }
  
  return { success, limit, reset, remaining };
}

/**
 * Check rate limit for authentication operations
 * 
 * @function checkAuthRateLimit
 * @param identifier - User identifier
 * @returns RateLimitResult - Rate limit result
 */
export async function checkAuthRateLimit(identifier: string) {
  const { success, limit, reset, remaining } = await authRateLimit.limit(identifier);
  
  if (!success) {
    throw new Error('Authentication rate limit exceeded. Please try again later.');
  }
  
  return { success, limit, reset, remaining };
}
```

## Security Validation
```typescript
/**
 * Security-Focused Validation
 * 
 * @file src/lib/validation/security-validation.ts
 * @description Security validation for financial applications
 */

import { z } from 'zod';

/**
 * Financial transaction validation with security constraints
 * 
 * @description Strict validation for financial transactions
 */
export const financialTransactionSchema = z.object({
  amount: z.number().positive().max(1000000), // Maximum transaction limit
  currency: z.enum(['USD', 'EUR', 'GBP']),
  accountNumber: z.string().regex(/^\d{8,12}$/),
  routingNumber: z.string().regex(/^\d{9}$/),
  description: z.string().max(255).regex(/^[a-zA-Z0-9\s\-.,]+$/), // Alphanumeric only
});

/**
 * User profile validation with security constraints
 * 
 * @description Strict validation for user profile data
 */
export const userProfileSchema = z.object({
  firstName: z.string().min(2).max(50).regex(/^[a-zA-Z\s]+$/),
  lastName: z.string().min(2).max(50).regex(/^[a-zA-Z\s]+$/),
  ssn: z.string().regex(/^\d{3}-\d{2}-\d{4}$/), // SSN format validation
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Date format validation
});

/**
 * API request validation
 * 
 * @description Validation for API requests with security constraints
 */
export const apiRequestSchema = z.object({
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE']),
  path: z.string().max(255),
  headers: z.record(z.string()),
  body: z.any().optional(),
});

/**
 * Security validation helper
 * 
 * @function validateSecurityInput
 * @param input - Input to validate
 * @param schema - Zod schema to validate against
 * @returns ValidationResult - Validation result
 */
export function validateSecurityInput<T>(input: unknown, schema: z.ZodSchema<T>) {
  try {
    const result = schema.parse(input);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```
