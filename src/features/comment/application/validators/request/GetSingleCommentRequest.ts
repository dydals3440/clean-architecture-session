import { z } from 'zod';

export const GetSingleCommentRequestSchema = z.object({
  id: z.number(),
});

export type GetSingleCommentRequest = z.infer<
  typeof GetSingleCommentRequestSchema
>;
