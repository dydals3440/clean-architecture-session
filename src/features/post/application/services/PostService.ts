import { PostMapper } from '@/features/post/application/mappers/PostMapper';
import type { PostClientImplements } from '@/features/post/infrastructure/apis/PostClientImplements';
import type { GetSinglePostRequest } from '@/features/post/infrastructure/dto/request/GetSinglePostRequest';

export default class PostService {
  private static instance: PostService | undefined;
  private readonly postClient: PostClientImplements;

  private constructor(postClient: PostClientImplements) {
    this.postClient = postClient;
  }

  public static getInstance(postClient: PostClientImplements): PostService {
    if (!PostService.instance) {
      PostService.instance = new PostService(postClient);
    }

    return PostService.instance;
  }

  public static resetInstance(): void {
    PostService.instance = undefined;
  }

  public async getSinglePost(request: GetSinglePostRequest) {
    // 1. PostClient에서 데이터를 받아온다.
    const singlePost = await this.postClient.getSinglePost(request);

    // 2. DTO를 도메인 객체로 변환한다.
    const post = PostMapper.toDomain(singlePost);

    // 3. 도메인 객체를 다시 DTO로 변환하여 반환한다.
    return PostMapper.toDto(post);
  }
}
