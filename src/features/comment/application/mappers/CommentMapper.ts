import { Comment } from '@/features/comment/domain/models/Comment';
import type { CommentResponseDto } from '@/features/comment/application/validators/response/CommentResponseDto';

export const toCommentResponseDto = (comment: Comment): CommentResponseDto => ({
  id: comment.id,
  body: comment.body,
  postId: comment.postId,
  isEmmaWilson: comment.isEmmaWilson(),

  // const user = comment.user; // 내부 dto.user를 직접 가리킴 (얕은 복사)

  user: {
    id: comment.user.id,
    username: comment.user.username,
    fullName: comment.user.fullName,
  },
});
