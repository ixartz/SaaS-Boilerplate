# Custom Hook Examples

## Authentication Hook
```tsx
/**
 * Custom hook for managing user authentication state
 * 
 * @file src/hooks/useAuth.ts
 * @description Authentication state management with Clerk integration
 */

import { useUser, useAuth as useClerkAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface AuthState {
  user: any | null;
  isSignedIn: boolean;
  isLoading: boolean;
  signOut: () => Promise<void>;
  signIn: (redirectUrl?: string) => void;
}

/**
 * Custom hook for authentication state management
 * 
 * @hook useAuth
 * @returns AuthState - Current authentication state and methods
 * 
 * @description
 * Provides authentication state management with Clerk integration.
 * Handles loading states, user data, and authentication methods.
 * 
 * @features
 * - User authentication status
 * - User profile data
 * - Sign in/out methods
 * - Loading and error states
 * 
 * @example
 * ```tsx
 * const { user, isSignedIn, signOut, isLoading } = useAuth();
 * 
 * if (isLoading) return <LoadingSpinner />;
 * if (!isSignedIn) return <SignInForm />;
 * 
 * return <Dashboard user={user} />;
 * ```
 */
export function useAuth(): AuthState {
  const { user, isLoaded } = useUser();
  const { signOut: clerkSignOut } = useClerkAuth();
  const router = useRouter();

  const signOut = useCallback(async () => {
    try {
      await clerkSignOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }, [clerkSignOut, router]);

  const signIn = useCallback((redirectUrl = '/dashboard') => {
    router.push(`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`);
  }, [router]);

  return {
    user,
    isSignedIn: !!user,
    isLoading: !isLoaded,
    signOut,
    signIn,
  };
}
```

## Data Fetching Hook
```tsx
/**
 * Custom hook for data fetching with loading and error states
 * 
 * @file src/hooks/useDataFetch.ts
 * @description Generic data fetching hook with caching and error handling
 */

import { useState, useEffect, useCallback } from 'react';

interface UseDataFetchOptions {
  immediate?: boolean;
  cache?: boolean;
  cacheKey?: string;
}

interface UseDataFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  mutate: (newData: T) => void;
}

/**
 * Custom hook for data fetching with loading and error states
 * 
 * @hook useDataFetch
 * @param fetchFn - Function that returns a Promise with the data
 * @param options - Configuration options for the hook
 * @returns UseDataFetchReturn - Data, loading state, error, and utility functions
 * 
 * @description
 * A generic data fetching hook that handles loading states, errors,
 * and provides utilities for refetching and mutating data.
 * 
 * @features
 * - Automatic loading state management
 * - Error handling and display
 * - Data caching (optional)
 * - Manual refetch capability
 * - Data mutation utilities
 * 
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useDataFetch(
 *   () => fetchUsers(),
 *   { immediate: true, cache: true, cacheKey: 'users' }
 * );
 * 
 * if (loading) return <LoadingSpinner />;
 * if (error) return <ErrorMessage error={error} />;
 * 
 * return <UserList users={data} onRefresh={refetch} />;
 * ```
 */
export function useDataFetch<T>(
  fetchFn: () => Promise<T>,
  options: UseDataFetchOptions = {}
): UseDataFetchReturn<T> {
  const { immediate = true, cache = false, cacheKey } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first if enabled
      if (cache && cacheKey) {
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          setData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
      }

      const result = await fetchFn();
      setData(result);

      // Cache data if enabled
      if (cache && cacheKey) {
        localStorage.setItem(cacheKey, JSON.stringify(result));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [fetchFn, cache, cacheKey]);

  const mutate = useCallback((newData: T) => {
    setData(newData);
    
    // Update cache if enabled
    if (cache && cacheKey) {
      localStorage.setItem(cacheKey, JSON.stringify(newData));
    }
  }, [cache, cacheKey]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [immediate, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    mutate,
  };
}
```

## Form Hook
```tsx
/**
 * Custom hook for form management with validation
 * 
 * @file src/hooks/useForm.ts
 * @description Form state management with validation and submission handling
 */

import { useState, useCallback } from 'react';
import { z } from 'zod';

interface UseFormOptions<T> {
  initialValues: T;
  validationSchema?: z.ZodSchema<T>;
  onSubmit: (values: T) => Promise<void> | void;
}

interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  setValue: (field: keyof T, value: any) => void;
  setValues: (values: Partial<T>) => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  reset: () => void;
  validate: () => boolean;
}

/**
 * Custom hook for form management with validation
 * 
 * @hook useForm
 * @param options - Form configuration options
 * @returns UseFormReturn - Form state and utility functions
 * 
 * @description
 * A comprehensive form management hook that handles form state,
 * validation, and submission with TypeScript support.
 * 
 * @features
 * - Form state management
 * - Zod schema validation
 * - Error handling and display
 * - Submission state tracking
 * - Field-level value updates
 * - Form reset functionality
 * 
 * @example
 * ```tsx
 * const schema = z.object({
 *   email: z.string().email('Invalid email'),
 *   name: z.string().min(2, 'Name too short'),
 * });
 * 
 * const { values, errors, isSubmitting, setValue, handleSubmit } = useForm({
 *   initialValues: { email: '', name: '' },
 *   validationSchema: schema,
 *   onSubmit: async (values) => {
 *     await createUser(values);
 *   },
 * });
 * 
 * return (
 *   <form onSubmit={handleSubmit}>
 *     <input
 *       value={values.email}
 *       onChange={(e) => setValue('email', e.target.value)}
 *     />
 *     {errors.email && <span>{errors.email}</span>}
 *   </form>
 * );
 * ```
 */
export function useForm<T extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const validate = useCallback((): boolean => {
    if (!validationSchema) return true;

    try {
      validationSchema.parse(values);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof T, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof T] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  }, [values, validationSchema]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    setValue,
    setValues,
    handleSubmit,
    reset,
    validate,
  };
}
```

## Local Storage Hook
```tsx
/**
 * Custom hook for localStorage with type safety
 * 
 * @file src/hooks/useLocalStorage.ts
 * @description Type-safe localStorage management with serialization
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for localStorage with type safety
 * 
 * @hook useLocalStorage
 * @param key - localStorage key
 * @param initialValue - Default value if key doesn't exist
 * @returns [value, setValue] - Current value and setter function
 * 
 * @description
 * A type-safe localStorage hook that handles serialization/deserialization
 * and provides React state synchronization.
 * 
 * @features
 * - Type-safe value handling
 * - Automatic serialization/deserialization
 * - SSR-safe implementation
 * - Error handling for invalid JSON
 * - State synchronization across tabs
 * 
 * @example
 * ```tsx
 * const [user, setUser] = useLocalStorage<User>('user', null);
 * const [theme, setTheme] = useLocalStorage<string>('theme', 'light');
 * 
 * // Update user
 * setUser({ id: '1', name: 'John' });
 * 
 * // Update theme
 * setTheme('dark');
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Get from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Listen for changes from other tabs
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}
```

## Debounced Hook
```tsx
/**
 * Custom hook for debounced values
 * 
 * @file src/hooks/useDebounce.ts
 * @description Debounced value hook for performance optimization
 */

import { useState, useEffect } from 'react';

/**
 * Custom hook for debounced values
 * 
 * @hook useDebounce
 * @param value - Value to debounce
 * @param delay - Debounce delay in milliseconds
 * @returns T - Debounced value
 * 
 * @description
 * A hook that delays updating a value until after a specified delay.
 * Useful for search inputs, API calls, and other performance optimizations.
 * 
 * @features
 * - Configurable delay timing
 * - Automatic cleanup on unmount
 * - Type-safe value handling
 * - Performance optimization for expensive operations
 * 
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * 
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     searchUsers(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 * 
 * return (
 *   <input
 *     value={searchTerm}
 *     onChange={(e) => setSearchTerm(e.target.value)}
 *     placeholder="Search users..."
 *   />
 * );
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```
