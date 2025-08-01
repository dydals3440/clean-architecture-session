import CommentService from '@/features/comment/application/services/CommentService';
import { StubCommentClient } from '@/features/comment/__tests__/infrastructure/apis/StubCommentClient';

import { beforeEach, describe, expect, it, afterEach } from 'vitest';
import { COMMENT_FIXTURE } from '@/features/comment/__tests__/fixtures/CommentFixture';

describe('CommentService', () => {
  let commentService: CommentService;

  beforeEach(() => {
    const commentClient = new StubCommentClient();
    commentService = CommentService.getInstance(commentClient);
  });

  afterEach(() => {
    CommentService.resetInstance();
  });

  describe('getAllComment', () => {
    it('should map raw comments to CommentResponseDto[] correctly', async () => {
      const response = await commentService.getAllComment({ postId: 1 });

      expect(Array.isArray(response)).toBe(true);
      expect(response).toHaveLength(2);
    });

    it('should return empty array if no comments match postId', async () => {
      const response = await commentService.getAllComment({ postId: 999999 });

      expect(Array.isArray(response)).toBe(true);
      expect(response).toEqual([]);
    });
  });

  describe('getSingleComment', () => {
    it('should return a mapped CommentResponseDto', async () => {
      const existing = COMMENT_FIXTURE[0];
      const result = await commentService.getSingleComment({ id: existing.id });

      expect(result.id).toBe(existing.id);
      expect(result.body).toBe(existing.body);
      expect(result.postId).toBe(existing.postId);
    });
  });
});
