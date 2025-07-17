import { z } from 'zod';

export const GetAllCommentRequestSchema = z.object({
  postId: z.number(),
});

export type GetAllCommentRequest = z.infer<typeof GetAllCommentRequestSchema>;
