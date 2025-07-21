// ViewModel
// Presentation Layer에서 사용하는 데이터 타입
// UI로 필요한 데이터를 가공해주는거죠. Domain이 변경되었다고 해서 영향을 받으면 안됨.

import type { Post } from '@/features/post/domain/models/Post';

// UI 중심 설계
// Domain 모델의 내부 복잡성은 숨김.
// 테스트
export interface PostViewModelProps {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  }[];
  views: number;
  userId: number;
  hasMotherInTitle: boolean;
}

// Domain -> ViewModel
// Domain: 비즈니스 로직 중심.
// ViewMode: UI 중심
// 외부 시스템의 개입은 절대 금지, zod 기반의 DTO 타입 (서버 응답 전용 타입)을 가져다 쓰는건 Layer간 의존 역전 위반입니다.

export const toPostViewModel = (post: Post): PostViewModelProps => ({
  id: post.id,
  title: post.title,
  body: post.body,
  tags: post.tags,
  reactions: post.reactions,
  views: post.views,
  userId: post.userId,
  hasMotherInTitle: post.hasMotherInTitle(),
});
