import { StubPostClient } from '@/features/post/__tests__/infrastructure/StubPostClient';
import { PostMapper } from '@/features/post/application/mappers/PostMapper';
import PostService from '@/features/post/application/services/PostService';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('PostService', () => {
  let postService: PostService;

  beforeEach(() => {
    const postClient = new StubPostClient();
    postService = PostService.getInstance(postClient);
  });

  afterEach(() => {
    PostService.resetInstance();
  });

  describe('getSinglePost', () => {
    it('should return post with the given id and hasMotherInTitle field', async () => {
      const id = 2;

      const singlePost = await postService.getSinglePost({ id });

      const post = PostMapper.toDomain(singlePost);
      expect(post.hasMotherInTitle()).toBe(false);
    });
  });
});
