import { POST_FIXTURE } from '@/features/post/__tests__/fixtures/PostFixture';
import { Post } from '@/features/post/domain/models/Post';
import { describe, expect, it } from 'vitest';

describe('Post', () => {
  it('should return true if post has mother in title', () => {
    const dto = POST_FIXTURE[0];
    const post = new Post(dto);

    expect(post.hasMotherInTitle()).toBe(true);
  });

  it('should return true if post has Matthew in title', () => {
    const dto = POST_FIXTURE[1];
    const post = new Post(dto);

    expect(post.hasMatthewInTitle()).toBe(true);
  });
});
