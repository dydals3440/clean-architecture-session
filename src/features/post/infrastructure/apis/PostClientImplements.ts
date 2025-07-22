import type { GetSinglePostRequest } from '../dto/request/GetSinglePostRequest';

import type { PostDto } from '../dto/post.dto';

export interface PostClientImplements {
  getSinglePost: (request: GetSinglePostRequest) => Promise<PostDto>;
}
