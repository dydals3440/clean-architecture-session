import { describe, it, expect } from 'vitest';
import { Comment } from '../../domain/models/Comment';
import { COMMENT_FIXTURE } from '@/features/comment/__tests__/fixtures/CommentFixture';

describe('Comment', () => {
  it('should return true if user is Emma Wilson', () => {
    const dto = COMMENT_FIXTURE[0];
    const comment = new Comment(dto);

    expect(comment.isEmmaWilson()).toBe(false);
  });

  it('should return false if user is not Emma Wilson', () => {
    const dto = COMMENT_FIXTURE[1];
    const comment = new Comment(dto);

    expect(comment.isEmmaWilson()).toBe(true);
  });
});
