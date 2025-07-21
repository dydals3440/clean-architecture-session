import {
  toPostViewModel,
  type PostViewModelProps,
} from '@/features/post/application/mappers/PostMapper';
import type { GetSinglePostRequest } from '@/features/post/application/validators/request/GetSinglePostRequest';
import { Post, type PostDto } from '@/features/post/domain/models/Post';
import type { PostClientImplements } from '@/features/post/infrastructure/apis/PostClientImplements';

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

  public createPostModel(postDto: PostDto): Post {
    return new Post(postDto);
  }

  public async getSinglePost(
    request: GetSinglePostRequest
  ): Promise<PostViewModelProps> {
    // TODO: 그냥 데이터만 받아오는게 아닌 hasMotherInTitle 비즈니스 규칙을 적용한 데이터를 받아오는 것
    // 1. PostClient에서 데이터를 받아와야한다.
    const singlePost = await this.postClient.getSinglePost(request);

    // 2. 데이터를 받아온 후에 hasMotherInTitle 비즈니스 규칙을 적용한다.
    const post = this.createPostModel(singlePost);

    return toPostViewModel(post);
  }
}
