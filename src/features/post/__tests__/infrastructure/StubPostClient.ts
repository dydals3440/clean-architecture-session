import { POST_FIXTURE } from '@/features/post/__tests__/fixtures/PostFixture';
import type { PostClientImplements } from '@/features/post/infrastructure/apis/PostClientImplements';
import type { Post } from '@/features/post/infrastructure/dto/post';
import type { GetSinglePostRequest } from '@/features/post/infrastructure/dto/request/GetSinglePostRequest';

export class StubPostClient implements PostClientImplements {
  public async getSinglePost(request: GetSinglePostRequest): Promise<Post> {
    const findPost = POST_FIXTURE.filter((post) => post.id === request.id);

    if (findPost.length === 0) {
      throw new Error('Post Not Found');
    }

    return findPost[0];
  }
}
