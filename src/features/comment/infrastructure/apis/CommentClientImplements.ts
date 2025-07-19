import type { PostLikeRequest } from '@/features/comment/infrastructure/dto/request/PostLikeRequest';
import type { GetAllCommentRequest } from '../dto/request/GetAllCommentRequest';
import type { GetSingleCommentRequest } from '../dto/request/GetSingleCommentRequest';
import type {
  Comment,
  GetAllCommentResponse,
} from '../dto/response/GetAllCommentResponse';

export interface CommentClientImplements {
  getAllComment: (
    request: GetAllCommentRequest
  ) => Promise<GetAllCommentResponse>;
  getSingleComment: (request: GetSingleCommentRequest) => Promise<Comment>;
  like: (request: PostLikeRequest) => Promise<void>;
}
