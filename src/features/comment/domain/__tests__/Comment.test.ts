import { describe, it, expect } from 'vitest';
import { Comment } from '../models/Comment';
import { commentMocks } from '@/features/comment/infrastructure/apis/__tests__/CommentMocks';

describe('Comment', () => {
  it('should return true if user is Emma Wilson', () => {
    const dto = commentMocks[0];
    const comment = new Comment(dto);

    expect(comment.isEmmaWilson()).toBe(false);
  });

  it('should return false if user is not Emma Wilson', () => {
    const dto = commentMocks[1];
    const comment = new Comment(dto);

    expect(comment.isEmmaWilson()).toBe(true);
  });
});
