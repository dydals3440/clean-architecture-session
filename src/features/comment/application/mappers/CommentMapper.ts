import { Comment } from '@/features/comment/domain/models/Comment';

import type { CommentResponseDto } from '../validators/response/CommentResponseDto';

export const toCommentResponseDto = (comment: Comment): CommentResponseDto => ({
  id: comment.id,
  body: comment.body,
  postId: comment.postId,
  isEmmaWilson: comment.isEmmaWilson(),

  // // 내부 dto.user를 직접 가리킴 (얕은 복사)
  // const user = comment.user;

  user: {
    id: comment.user.id,
    username: comment.user.username,
    fullName: comment.user.fullName,
  },
});
