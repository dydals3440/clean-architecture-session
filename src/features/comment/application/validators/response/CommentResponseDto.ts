import { z } from 'zod';

export const CommentResponseSchema = z.object({
  id: z.number(),
  body: z.string(),
  postId: z.number(),
  isEmmaWilson: z.boolean(),
  user: z.object({
    id: z.number(),
    username: z.string(),
    fullName: z.string(),
  }),
});

export type CommentResponseDto = z.infer<typeof CommentResponseSchema>;
