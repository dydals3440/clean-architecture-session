import { Comment } from '@/features/comment/domain/models/Comment';
import type { CommentClientImplements } from '@/features/comment/infrastructure/apis/CommentClientImplements';
import type { GetAllCommentRequest } from '../validators/request/GetAllCommentRequest';
import type { GetSingleCommentRequest } from '../validators/request/GetSingleCommentRequest';
import type { CommentResponseDto } from '../validators/response/CommentResponseDto';
import { toCommentResponseDto } from '../mappers/CommentMapper';

export default class CommentService {
  private static instance: CommentService | undefined;

  private readonly commentClient: CommentClientImplements;

  private constructor(commentClient: CommentClientImplements) {
    this.commentClient = commentClient;
  }

  public static getInstance(
    commentClient: CommentClientImplements
  ): CommentService {
    if (!CommentService.instance) {
      CommentService.instance = new CommentService(commentClient);
    }

    return CommentService.instance;
  }

  public static resetInstance(): void {
    this.instance = undefined;
  }

  public async getAllComment(
    request: GetAllCommentRequest
  ): Promise<CommentResponseDto[]> {
    const { comments } = await this.commentClient.getAllComment(request);

    return comments.map((comment) => {
      const data = new Comment(comment);

      return {
        ...toCommentResponseDto(data),
      };
    });
  }

  public async getSingleComment(
    request: GetSingleCommentRequest
  ): Promise<Comment> {
    const comment = await this.commentClient.getSingleComment(request);

    return new Comment(comment);
  }
}
