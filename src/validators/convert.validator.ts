import { z } from 'zod';

export const convertQuerySchema = z.object({
  from: z.string().length(3, "Invalid 'from' currency").toUpperCase(),
  to: z.string().length(3, "Invalid 'to' currency").toUpperCase(),
  amount: z
    .string()
    .transform(Number)
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Amount must be a positive number',
    }),
});

export type ConvertQueryParams = z.infer<typeof convertQuerySchema>;
