import type { PostClientImplements } from './PostClientImplements';

import type { GetSinglePostRequest } from '../dto/request/GetSinglePostRequest';
import type { PostDto } from '../dto/post.dto';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { API_ENDPOINTS } from '@/features/post/infrastructure/apis/constants/url';

export class PostClient implements PostClientImplements {
  private static instance: PostClient | undefined;
  private readonly httpClient: AxiosInstance;

  private constructor() {
    this.httpClient = axios.create({
      baseURL: API_ENDPOINTS.POSTS,
    });
  }

  public static getInstance(): PostClient {
    if (!PostClient.instance) {
      PostClient.instance = new PostClient();
    }

    return PostClient.instance;
  }

  public static resetInstance(): void {
    PostClient.instance = undefined;
  }

  public async getSinglePost(request: GetSinglePostRequest): Promise<PostDto> {
    const { data } = await this.httpClient.get<PostDto>(`/${request.id}`);

    return data;
  }
}
