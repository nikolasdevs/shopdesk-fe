import { z } from 'zod';

export const stockSchema = z.object({
  id: z.string(),
  name: z.string(),
  sell_price: z.string(),
  available: z.string(),
});

export type Stock = z.infer<typeof stockSchema>;
