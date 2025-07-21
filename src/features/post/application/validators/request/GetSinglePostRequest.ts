import { z } from 'zod';

export const getSinglePostRequestSchema = z.object({
  id: z.number(),
});

export type GetSinglePostRequest = z.infer<typeof getSinglePostRequestSchema>;
