import type { GetAllCommentRequest } from '@/features/comment/infrastructure/dto/request/GetAllCommentRequest';
import type {
  Comment,
  GetAllCommentResponse,
} from '@/features/comment/infrastructure/dto/response/GetAllCommentResponse';
import type { GetSingleCommentRequest } from '@/features/comment/infrastructure/dto/request/GetSingleCommentRequest';

export interface CommentClientImplements {
  getAllComment: (
    request: GetAllCommentRequest
  ) => Promise<GetAllCommentResponse>;
  getSingleComment: (request: GetSingleCommentRequest) => Promise<Comment>;
}
