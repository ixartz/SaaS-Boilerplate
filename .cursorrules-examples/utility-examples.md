# Utility Function Examples

## String Utilities
```tsx
/**
 * String Utilities
 * 
 * @file src/utils/string.ts
 * @description Common string manipulation utilities
 */

/**
 * Capitalizes the first letter of each word in a string
 * 
 * @function capitalizeWords
 * @param str - Input string to capitalize
 * @returns string - String with capitalized words
 * 
 * @description
 * Converts a string to title case by capitalizing the first letter
 * of each word while keeping the rest lowercase.
 * 
 * @example
 * ```typescript
 * capitalizeWords('hello world'); // 'Hello World'
 * capitalizeWords('JAVASCRIPT IS AWESOME'); // 'Javascript Is Awesome'
 * capitalizeWords(''); // ''
 * ```
 * 
 * @performance
 * Time complexity: O(n) where n is string length
 * Space complexity: O(n) for the result string
 */
export function capitalizeWords(str: string): string {
  if (!str) return str;
  
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Converts a string to kebab-case
 * 
 * @function toKebabCase
 * @param str - Input string to convert
 * @returns string - Kebab-case string
 * 
 * @example
 * ```typescript
 * toKebabCase('Hello World'); // 'hello-world'
 * toKebabCase('camelCaseString'); // 'camel-case-string'
 * toKebabCase('PascalCaseString'); // 'pascal-case-string'
 * ```
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Truncates a string to a specified length with ellipsis
 * 
 * @function truncate
 * @param str - Input string to truncate
 * @param length - Maximum length
 * @param suffix - Suffix to add (default: '...')
 * @returns string - Truncated string
 * 
 * @example
 * ```typescript
 * truncate('This is a long string', 10); // 'This is a ...'
 * truncate('Short', 10); // 'Short'
 * truncate('Hello World', 5, '---'); // 'Hello---'
 * ```
 */
export function truncate(str: string, length: number, suffix = '...'): string {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
}
```

## Date Utilities
```tsx
/**
 * Date Utilities
 * 
 * @file src/utils/date.ts
 * @description Common date manipulation utilities
 */

/**
 * Formats a date to a human-readable string
 * 
 * @function formatDate
 * @param date - Date to format
 * @param options - Formatting options
 * @returns string - Formatted date string
 * 
 * @example
 * ```typescript
 * formatDate(new Date()); // 'January 1, 2024'
 * formatDate(new Date(), { short: true }); // 'Jan 1, 2024'
 * formatDate(new Date(), { includeTime: true }); // 'January 1, 2024 at 12:00 PM'
 * ```
 */
export function formatDate(
  date: Date,
  options: {
    short?: boolean;
    includeTime?: boolean;
    timezone?: string;
  } = {}
): string {
  const { short = false, includeTime = false, timezone } = options;
  
  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: short ? 'short' : 'long',
    day: 'numeric',
    ...(includeTime && {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }),
    ...(timezone && { timeZone: timezone }),
  };

  return new Intl.DateTimeFormat('en-US', formatOptions).format(date);
}

/**
 * Calculates the time difference between two dates
 * 
 * @function timeAgo
 * @param date - Date to compare
 * @param now - Current date (default: new Date())
 * @returns string - Human-readable time difference
 * 
 * @example
 * ```typescript
 * timeAgo(new Date(Date.now() - 60000)); // '1 minute ago'
 * timeAgo(new Date(Date.now() - 3600000)); // '1 hour ago'
 * timeAgo(new Date(Date.now() - 86400000)); // '1 day ago'
 * ```
 */
export function timeAgo(date: Date, now = new Date()): string {
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minute${diffInSeconds >= 120 ? 's' : ''} ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hour${diffInSeconds >= 7200 ? 's' : ''} ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} day${diffInSeconds >= 172800 ? 's' : ''} ago`;
  
  return formatDate(date, { short: true });
}

/**
 * Checks if a date is today
 * 
 * @function isToday
 * @param date - Date to check
 * @returns boolean - True if date is today
 * 
 * @example
 * ```typescript
 * isToday(new Date()); // true
 * isToday(new Date('2023-01-01')); // false (assuming not today)
 * ```
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
```

## Validation Utilities
```tsx
/**
 * Validation Utilities
 * 
 * @file src/utils/validation.ts
 * @description Common validation functions
 */

/**
 * Validates an email address
 * 
 * @function isValidEmail
 * @param email - Email to validate
 * @returns boolean - True if email is valid
 * 
 * @example
 * ```typescript
 * isValidEmail('user@example.com'); // true
 * isValidEmail('invalid-email'); // false
 * isValidEmail(''); // false
 * ```
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a phone number
 * 
 * @function isValidPhone
 * @param phone - Phone number to validate
 * @returns boolean - True if phone is valid
 * 
 * @example
 * ```typescript
 * isValidPhone('+1234567890'); // true
 * isValidPhone('(123) 456-7890'); // true
 * isValidPhone('123-456-7890'); // true
 * isValidPhone('invalid'); // false
 * ```
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  return phoneRegex.test(cleanPhone);
}

/**
 * Validates a URL
 * 
 * @function isValidUrl
 * @param url - URL to validate
 * @returns boolean - True if URL is valid
 * 
 * @example
 * ```typescript
 * isValidUrl('https://example.com'); // true
 * isValidUrl('http://localhost:3000'); // true
 * isValidUrl('invalid-url'); // false
 * ```
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
```

## Array Utilities
```tsx
/**
 * Array Utilities
 * 
 * @file src/utils/array.ts
 * @description Common array manipulation utilities
 */

/**
 * Removes duplicate values from an array
 * 
 * @function unique
 * @param array - Array to deduplicate
 * @returns T[] - Array with unique values
 * 
 * @example
 * ```typescript
 * unique([1, 2, 2, 3, 3, 3]); // [1, 2, 3]
 * unique(['a', 'b', 'a', 'c']); // ['a', 'b', 'c']
 * ```
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Groups array items by a key function
 * 
 * @function groupBy
 * @param array - Array to group
 * @param keyFn - Function to extract key from each item
 * @returns Record<string, T[]> - Object with grouped items
 * 
 * @example
 * ```typescript
 * const users = [
 *   { name: 'John', age: 25 },
 *   { name: 'Jane', age: 25 },
 *   { name: 'Bob', age: 30 }
 * ];
 * 
 * groupBy(users, user => user.age);
 * // { '25': [{ name: 'John', age: 25 }, { name: 'Jane', age: 25 }], '30': [{ name: 'Bob', age: 30 }] }
 * ```
 */
export function groupBy<T, K extends string | number>(
  array: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return array.reduce((groups, item) => {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

/**
 * Chunks an array into smaller arrays of specified size
 * 
 * @function chunk
 * @param array - Array to chunk
 * @param size - Size of each chunk
 * @returns T[][] - Array of chunks
 * 
 * @example
 * ```typescript
 * chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
 * chunk(['a', 'b', 'c', 'd'], 3); // [['a', 'b', 'c'], ['d']]
 * ```
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
```

## Object Utilities
```tsx
/**
 * Object Utilities
 * 
 * @file src/utils/object.ts
 * @description Common object manipulation utilities
 */

/**
 * Deep merges two objects
 * 
 * @function deepMerge
 * @param target - Target object
 * @param source - Source object to merge
 * @returns T - Merged object
 * 
 * @example
 * ```typescript
 * deepMerge({ a: 1, b: { c: 2 } }, { b: { d: 3 } });
 * // { a: 1, b: { c: 2, d: 3 } }
 * ```
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] !== undefined) {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key]) &&
        typeof result[key] === 'object' &&
        result[key] !== null &&
        !Array.isArray(result[key])
      ) {
        result[key] = deepMerge(result[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  
  return result;
}

/**
 * Picks specified keys from an object
 * 
 * @function pick
 * @param obj - Object to pick from
 * @param keys - Keys to pick
 * @returns Partial<T> - Object with picked keys
 * 
 * @example
 * ```typescript
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'c']); // { a: 1, c: 3 }
 * ```
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

/**
 * Omits specified keys from an object
 * 
 * @function omit
 * @param obj - Object to omit from
 * @param keys - Keys to omit
 * @returns Omit<T, K> - Object without omitted keys
 * 
 * @example
 * ```typescript
 * omit({ a: 1, b: 2, c: 3 }, ['b']); // { a: 1, c: 3 }
 * ```
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
}
```

## Error Handling Utilities
```tsx
/**
 * Error Handling Utilities
 * 
 * @file src/utils/error.ts
 * @description Common error handling utilities
 */

/**
 * Creates a standardized error object
 * 
 * @function createError
 * @param message - Error message
 * @param code - Error code
 * @param status - HTTP status code
 * @returns Error - Standardized error object
 * 
 * @example
 * ```typescript
 * throw createError('User not found', 'USER_NOT_FOUND', 404);
 * ```
 */
export function createError(
  message: string,
  code: string,
  status: number = 500
): Error & { code: string; status: number } {
  const error = new Error(message) as Error & { code: string; status: number };
  error.code = code;
  error.status = status;
  return error;
}

/**
 * Safely executes a function and returns result or error
 * 
 * @function safeExecute
 * @param fn - Function to execute
 * @param fallback - Fallback value if function throws
 * @returns T | U - Function result or fallback value
 * 
 * @example
 * ```typescript
 * const result = safeExecute(() => JSON.parse(invalidJson), null);
 * // result will be null if JSON.parse throws
 * ```
 */
export function safeExecute<T, U>(
  fn: () => T,
  fallback: U
): T | U {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

/**
 * Retries a function with exponential backoff
 * 
 * @function retry
 * @param fn - Function to retry
 * @param options - Retry options
 * @returns Promise<T> - Function result
 * 
 * @example
 * ```typescript
 * const result = await retry(
 *   () => fetchData(),
 *   { attempts: 3, delay: 1000 }
 * );
 * ```
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    attempts?: number;
    delay?: number;
    backoff?: number;
  } = {}
): Promise<T> {
  const { attempts = 3, delay = 1000, backoff = 2 } = options;
  
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === attempts - 1) throw error;
      
      const waitTime = delay * Math.pow(backoff, i);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  
  throw new Error('Retry failed');
}
```
