import { COMMENT_FIXTURE } from '@/features/comment/__tests__/fixtures/CommentFixture';
import { StubCommentClient } from '@/features/comment/__tests__/infrastructure/apis/StubCommentClient';
import { describe, it, expect } from 'vitest';

describe('CommentClient', () => {
  const client = new StubCommentClient();

  describe('getAllComment', () => {
    it('should return comments with the given postId', async () => {
      const postId = 1;

      const response = await client.getAllComment({ postId });

      expect(response.comments.every((c) => c.postId === postId)).toBe(true);
      expect(response.total).toBe(response.comments.length);
    });

    it('should return empty list if postId does not match', async () => {
      const response = await client.getAllComment({ postId: -999 });

      expect(response.comments).toHaveLength(0);
      expect(response.total).toBe(0);
    });
  });

  describe('getSingleComment', () => {
    it('should return the comment matching the given id', async () => {
      const existingComment = COMMENT_FIXTURE[0];

      const comment = await client.getSingleComment({ id: existingComment.id });

      expect(comment).toEqual(existingComment);
    });

    it('should throw error if comment does not exist', async () => {
      const id = -999;

      await expect(client.getSingleComment({ id })).rejects.toThrowError(
        `Comment with id ${id} not found`
      );
    });
  });
});
