import axios, { type AxiosInstance } from 'axios';

import type { GetAllCommentRequest } from '../dto/request/GetAllCommentRequest';
import type { GetSingleCommentRequest } from '../dto/request/GetSingleCommentRequest';
import type {
  GetAllCommentResponse,
  Comment,
} from '../dto/response/GetAllCommentResponse';
import type { CommentClientImplements } from './CommentClientImplements';
import { API_ENDPOINTS } from './constants/url';
import type { PostLikeRequest } from '../dto/request/PostLikeRequest';

export class CommentClient implements CommentClientImplements {
  private static instance: CommentClient | undefined;
  private readonly httpClient: AxiosInstance;

  private constructor() {
    this.httpClient = axios.create({
      baseURL: API_ENDPOINTS.COMMENTS,
    });
  }

  public static getInstance(): CommentClient {
    if (!CommentClient.instance) {
      CommentClient.instance = new CommentClient();
    }

    return CommentClient.instance;
  }

  public static resetInstance(): void {
    CommentClient.instance = undefined;
  }

  public async getAllComment(
    request: GetAllCommentRequest
  ): Promise<GetAllCommentResponse> {
    const { data } = await this.httpClient.get<GetAllCommentResponse>(
      `?postId=${request.postId}`
    );

    return data;
  }

  public async getSingleComment(
    request: GetSingleCommentRequest
  ): Promise<Comment> {
    const { data } = await this.httpClient.get<Comment>(`/${request.id}`);

    return data;
  }

  public async like(request: PostLikeRequest): Promise<void> {
    await this.httpClient.post(`/${request.commentId}/like`);
  }
}
