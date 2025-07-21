import { StubPostClient } from '@/features/post/__tests__/infrastructure/StubPostClient';
import { describe, expect, it } from 'vitest';

describe('PostClient', () => {
  const postClient = new StubPostClient();

  describe('getSinglePost', () => {
    it('should return post with the given id', async () => {
      // given
      const id = 2;
      // when
      const response = await postClient.getSinglePost({ id });

      // then
      expect(response.id).toBe(id);
      expect(response.title).toBe('Matthew Babo');
      expect(response.body).toBe('Matthew Babo is a good boy');
      expect(response.tags).toEqual(['ohtani', 'american', 'crime']);
      expect(response.reactions.likes).toBe(192);
      expect(response.reactions.dislikes).toBe(25);
      expect(response.views).toBe(305);
      expect(response.userId).toBe(121);
    });

    it('should throw error if post not found', async () => {
      // given
      const id = -999;

      // expected
      const response = postClient.getSinglePost({ id });

      // then
      expect(response).rejects.toThrowError('Post Not Found');
    });
  });
});
