import type { GetAllCommentRequest } from '../dto/request/GetAllCommentRequest';
import type {
  Comment,
  GetAllCommentResponse,
} from '../dto/response/GetAllCommentResponse';
import type { GetSingleCommentRequest } from '../dto/request/GetSingleCommentRequest';

export interface CommentClientImplements {
  getAllComment: (
    request: GetAllCommentRequest
  ) => Promise<GetAllCommentResponse>;
  getSingleComment: (request: GetSingleCommentRequest) => Promise<Comment>;
}
