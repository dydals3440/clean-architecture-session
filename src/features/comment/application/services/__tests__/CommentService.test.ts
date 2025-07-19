import CommentService from '@/features/comment/application/services/CommentService';
import { StubCommentClient } from '@/features/comment/infrastructure/apis/__tests__/StubCommentClient';
import { commentMocks } from '@/features/comment/infrastructure/apis/__tests__/CommentMocks';
import { beforeEach, describe, expect, it, afterEach } from 'vitest';
import { Comment } from '@/features/comment/domain/models/Comment';

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
    it('should return a Comment domain object', async () => {
      const existing = commentMocks[0];
      const result = await commentService.getSingleComment({ id: existing.id });

      expect(result).toBeInstanceOf(Comment);
      console.log(result);

      expect(result).toBeInstanceOf(Comment);
      expect(result.id).toBe(existing.id);
      expect(result.postId).toBe(existing.postId);
      expect(result.body).toBe(existing.body);
    });
  });
});
