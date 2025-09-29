import { z } from 'zod';

export const cursorQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform(v => (v ? Number(v) : undefined))
    .refine(v => (v === undefined ? true : Number.isInteger(v) && v > 0 && v <= 100), {
      message: 'limit must be an integer between 1 and 100',
    }),
  cursor: z.string().optional(),
});

export type CursorQuery = z.infer<typeof cursorQuerySchema>;

export function buildCursorPagination<T extends { id: string }>(
  rows: T[],
  limit?: number,
) {
  const hasMore = limit !== undefined && rows.length === limit;
  const nextCursor = hasMore ? rows[rows.length - 1]?.id : undefined;

  return { hasMore, nextCursor } as const;
}
