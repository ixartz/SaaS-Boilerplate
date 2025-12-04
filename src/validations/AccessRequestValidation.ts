import { z } from 'zod';

export const AccessRequestValidation = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});
