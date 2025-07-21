import type { GetSinglePostRequest } from '../dto/request/GetSinglePostRequest';

import type { Post } from '../dto/post';

export interface PostClientImplements {
  getSinglePost: (request: GetSinglePostRequest) => Promise<Post>;
}
