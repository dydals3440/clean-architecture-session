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

  // 도메인 모델 생성 책임을 Application 레이어로 이동
  public createCommentModel(commentDto: CommentResponseDto): Comment {
    return new Comment(commentDto);
  }

  public async getAllComment(
    request: GetAllCommentRequest
  ): Promise<CommentResponseDto[]> {
    const { comments } = await this.commentClient.getAllComment(request);

    return comments.map((comment) => {
      const commentDomain = this.createCommentModel(comment);

      // ViewModel만 반환
      return toCommentResponseDto(commentDomain);
    });
  }

  public async getSingleComment(
    request: GetSingleCommentRequest
  ): Promise<CommentResponseDto> {
    const commentDTO = await this.commentClient.getSingleComment(request);
    const commentDomain = this.createCommentModel(commentDTO);

    return toCommentResponseDto(commentDomain);
  }

  public async like(comment: Comment, userId: number): Promise<void> {
    if (!comment.canLike(userId)) {
      throw new Error('자기 댓글에는 좋아요를 누를 수 없습니다.');
    }

    await this.commentClient.like({
      commentId: comment.id,
    });
  }

  // 좋아요 가능 여부 확인 메서드 추가
  public canLikeComment(
    commentDto: CommentResponseDto,
    userId: number
  ): boolean {
    const comment = this.createCommentModel(commentDto);
    return comment.canLike(userId);
  }
}
