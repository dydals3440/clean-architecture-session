import axios, { type AxiosInstance } from 'axios';

import type {
  GetAllCommentResponse,
  Comment,
} from '@/features/comment/infrastructure/dto/response/GetAllCommentResponse';

import type { GetSingleCommentRequest } from '../dto/request/GetSingleCommentRequest';
import type { CommentClientImplements } from './CommentClientImplements';
import type { GetAllCommentRequest } from '../dto/request/GetAllCommentRequest';
import { API_ENDPOINTS } from './constants/url';

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
}
