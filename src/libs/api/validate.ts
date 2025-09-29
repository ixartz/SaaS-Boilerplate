import { z } from 'zod';

import { badRequest, unprocessable } from './errors';

export async function parseJson<T extends z.ZodTypeAny>(
  req: Request,
  schema: T,
) {
  try {
    const json = await req.json();
    const data = schema.parse(json);
    return { data } as const;
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { error: unprocessable('Validation failed', { issues: err.issues }) } as const;
    }
    return { error: badRequest('Invalid JSON body') } as const;
  }
}

export function parseQuery<T extends z.ZodTypeAny>(
  req: Request,
  schema: T,
) {
  try {
    const params = Object.fromEntries(new URL(req.url).searchParams.entries());
    const data = schema.parse(params);
    return { data } as const;
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { error: unprocessable('Validation failed', { issues: err.issues }) } as const;
    }
    return { error: badRequest('Invalid query parameters') } as const;
  }
}
