import { Comment } from '@/features/comment/domain/models/Comment';

// ViewModel
// Presentation Layer에서 사용.
// UI로 필요한 데이터가 필요하기 때문, Domain이 변경되었다고 해서 영향을 받으면 안됨.
// - UI 중심으로 설계
// - Domain 모델의 내부 복잡성은 숨김
// - 테스트, Mock 용이
export interface CommentViewModelProps {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
  isEmmaWilson: boolean;
}

// Domain을 ViewModel로 변환하는 메서드
// Domain : 비즈니스 로직 중심, ViewModel: UI 중심
// 외부 시스템의 개입은 절대 금지 -> zod 기반의 Dto 타입 (서버 응답 전용 타입)을 가져다 쓰는 건 Layer 간 의존 역전 위반입니다.
export const toCommentResponseDto = (
  comment: Comment
): CommentViewModelProps => ({
  id: comment.id,
  body: comment.body,
  postId: comment.postId,
  isEmmaWilson: comment.isEmmaWilson(),
  user: {
    id: comment.user.id,
    username: comment.user.username,
    fullName: comment.user.fullName,
  },
});
