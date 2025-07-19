import type { CommentClientImplements } from '@/features/comment/infrastructure/apis/CommentClientImplements';
import type { GetSingleCommentRequest } from '@/features/comment/infrastructure/dto/request/GetSingleCommentRequest';
import type {
  GetAllCommentResponse,
  Comment,
} from '@/features/comment/infrastructure/dto/response/GetAllCommentResponse';
import { commentMocks } from './CommentMocks';
import type { GetAllCommentRequest } from '@/features/comment/infrastructure/dto/request/GetAllCommentRequest';

export class StubCommentClient implements CommentClientImplements {
  public async getAllComment(
    request: GetAllCommentRequest
  ): Promise<GetAllCommentResponse> {
    const filtered = commentMocks.filter(
      (comment) => comment.postId === request.postId
    );

    return {
      comments: filtered,
      limit: 10,
      skip: 0,
      total: filtered.length,
    };
  }

  public async getSingleComment(
    request: GetSingleCommentRequest
  ): Promise<Comment> {
    const comment = commentMocks.find((c) => c.id === request.id);

    if (!comment) {
      throw new Error(`Comment with id ${request.id} not found`);
    }

    return comment;
  }
}
