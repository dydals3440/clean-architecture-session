# 🏛️ 클린 아키텍처란 무엇일까요?

## 1. 클린 아키텍처란?

- **클린 아키텍처**는 소프트웨어를 여러 층(레이어)으로 나누어, 각 층이 자기 역할만 하도록 만드는 설계 방법이에요.
- 마치 학교에서 선생님, 학생, 교장선생님이 각자 역할이 다르듯, 코드도 역할을 나눠서 관리해요.

---

## 2. 왜 이렇게 나눌까요?

- **코드가 복잡해져도** 쉽게 고치고, 새로운 기능을 추가할 수 있어요.
- **실수로 다른 역할을 침범하는 것**을 막아줘요.
- **테스트(검사)하기도 쉬워져요!**

---

## 3. 각 레이어(층)의 역할

### 1) domain (도메인)

- **진짜 중요한 비즈니스 규칙**이 들어있어요.
- 예시: 댓글(Comment)이라는 개념, 댓글이 핵심 유저인지 판단하는 규칙 등
- **다른 레이어에 의존하지 않아요!**

### 2) application (애플리케이션)

- **무엇을 할지(유스케이스)**를 정의해요.
- 예시: 댓글 목록 가져오기, 댓글 하나 가져오기 등
- 도메인 모델을 사용해서 실제 동작을 만들어요.
- **validators**: 사용자가 보낸 데이터가 올바른지 "런타임에" 검사해요. (예: 숫자인지, 비어있지 않은지 등)
- **mappers**: 도메인 모델을 화면에 보여줄 데이터(ViewModel)로 바꿔줘요.

### 3) infrastructure (인프라)

- **외부와 연결**하는 역할이에요. (서버, 데이터베이스 등)
- 서버에서 받은 데이터(DTO)를 도메인 모델로 바꿔줘요.
- **DTO(데이터 전송 객체)**: 서버에서 받은 원본 데이터, 서버에서 "검증"된 데이터

### 4) presentation (프레젠테이션)

- **화면에 보여주는 부분**이에요.
- ViewModel만 사용해서 화면을 그려요.
- 도메인, 인프라에 직접 접근하면 안 돼요!

---

## 4. 왜 레이어를 침범하면 안 될까요?

- 각자 역할이 있는데, 다른 역할을 침범하면 **코드가 엉키고, 고치기 어려워져요.**
- 예를 들어, 화면에서 바로 서버 데이터(DTO)를 쓰면, 서버가 바뀔 때마다 화면도 다 고쳐야 해요.
- **의존성 방향**: 바깥(인프라, 프레젠테이션) → 안쪽(도메인)으로만 의존해야 해요. (안쪽은 바깥을 몰라도 돼요!)

---

## 5. 테스트 코드 짜기 좋은 이유

- 각 레이어가 분리되어 있으니, **가짜(모의) 데이터**로도 쉽게 테스트할 수 있어요.
- 예를 들어, 서버 없이도 도메인, 애플리케이션만 따로 검사할 수 있어요.
- 역할이 분명하니, "이 부분만" 테스트하기가 쉬워요.

---

## 6. 개발할 때 꼭! 유의할 점

- **레이어를 절대 침범하지 마세요!** (예: 화면에서 도메인/인프라 직접 접근 금지)
- **의존성 방향**을 항상 지키세요. (밖에서 안으로만)
- **DTO와 ViewModel, 도메인 모델**을 헷갈리지 마세요.
- **검증 위치**를 구분하세요:
  - application/validators: 사용자가 보낸 데이터 "런타임" 검사
  - infrastructure/dto: 서버에서 "검증"된 데이터
- **테스트 코드**를 꼭 작성하세요. (분리된 구조라서 쉽고, 실수도 줄일 수 있어요)

---

## 7. 한눈에 보는 구조도

```mermaid
graph TD
  P[Presentation (화면)] -->|ViewModel| A(Application)
  A -->|도메인 모델| D(Domain)
  A -->|DTO 변환| I(Infrastructure)
  I -->|서버 통신| S[서버]

  style P fill:#f9f,stroke:#333,stroke-width:2px
  style A fill:#bbf,stroke:#333,stroke-width:2px
  style D fill:#bfb,stroke:#333,stroke-width:2px
  style I fill:#ffb,stroke:#333,stroke-width:2px
  style S fill:#eee,stroke:#333,stroke-width:2px
```

---

## 8. 실제 예제 코드로 보는 클린 아키텍처

### 1) 도메인 모델 (domain/models/Comment.ts)

```typescript
export interface CommentDto {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

export class Comment {
  public readonly fullName: string;

  constructor(private readonly commentDto: CommentDto) {
    this.fullName = commentDto.user.fullName;
  }

  get id() {
    return this.commentDto.id;
  }
  get body() {
    return this.commentDto.body;
  }
  get postId() {
    return this.commentDto.postId;
  }
  get user() {
    return this.commentDto.user;
  }

  isEmmaWilson(): boolean {
    return this.fullName === '(핵심 유저) Emma Wilson';
  }
}
```

### 2) 인프라 클라이언트 (infrastructure/apis/CommentClientImplements.ts)

```typescript
export class CommentClientImplements {
  async getAllComment(request) {
    // 서버에서 댓글 목록을 받아온다 (여기선 예시)
    return {
      comments: [
        /* 서버에서 받은 댓글 DTO 배열 */
      ],
    };
  }
}
```

### 3) 서비스 (application/services/CommentService.ts)

```typescript
import { Comment } from '@/features/comment/domain/models/Comment';

export default class CommentService {
  constructor(private readonly commentClient) {}

  async getAllComment(request) {
    const { comments } = await this.commentClient.getAllComment(request);
    return comments.map((comment) => new Comment(comment));
  }
}
```

### 4) 뷰모델 매퍼 (application/mappers/CommentViewModel.ts)

```typescript
import { Comment } from '@/features/comment/domain/models/Comment';

export interface CommentViewModel {
  id: number;
  body: string;
  postId: number;
  isEmmaWilson: boolean;
  user: { id: number; username: string; fullName: string };
}

export function mapToCommentViewModel(comment: Comment): CommentViewModel {
  return {
    id: comment.id,
    body: comment.body,
    postId: comment.postId,
    isEmmaWilson: comment.isEmmaWilson(),
    user: comment.user,
  };
}
```

### 5) 프레젠테이션 (presentation/components/CommentView.tsx)

```tsx
import { mapToCommentViewModel } from '@/features/comment/application/mappers/CommentViewModel';

function CommentView({ comment }) {
  const viewModel = mapToCommentViewModel(comment);
  return (
    <div>
      <div>{viewModel.body}</div>
      <div>{viewModel.user.fullName}</div>
      {viewModel.isEmmaWilson && <span>🌟 핵심 유저!</span>}
    </div>
  );
}
```

---

## 9. 실제 API 기반 개발 순서 예시

1. **API 명세 확인** (백엔드와 협의)
2. **infrastructure/dto/response**에 서버 응답 타입 정의
3. **infrastructure/apis**에 실제 서버 통신 클라이언트 구현
4. **domain/models**에 도메인 모델 구현 (비즈니스 규칙 포함)
5. **application/services**에 유스케이스(서비스) 구현 (클라이언트로부터 도메인 모델 생성)
6. **application/mappers**에 ViewModel 변환 함수 구현
7. **presentation**에서 ViewModel만 사용해 화면 구현
8. **application/validators**에서 입력값 런타임 검증

---

## 10. TDD(테스트 주도 개발)로 개발하는 순서 예시

1. **테스트 코드부터 작성** (원하는 동작을 미리 코드로 적음)
2. **StubClient(가짜 클라이언트)**를 만들어 실제 서버 없이 테스트
3. **도메인/서비스/매퍼 등 실제 코드 작성**
4. **테스트가 통과할 때까지 코드 수정**
5. **실제 서버 클라이언트로 교체**

---

## 11. StubClient를 활용한 테스트 코드 예시

### 1) StubClient 만들기

```typescript
// tests/StubCommentClient.ts
export class StubCommentClient {
  async getAllComment(request) {
    return {
      comments: [
        {
          id: 1,
          body: '테스트 댓글',
          postId: 123,
          user: {
            id: 1,
            username: 'emma',
            fullName: '(핵심 유저) Emma Wilson',
          },
        },
      ],
    };
  }
}
```

### 2) 서비스 테스트 코드

```typescript
import CommentService from '@/features/comment/application/services/CommentService';
import { StubCommentClient } from './StubCommentClient';

describe('CommentService', () => {
  it('핵심 유저 댓글을 올바르게 반환한다', async () => {
    const service = new CommentService(new StubCommentClient());
    const comments = await service.getAllComment({});
    expect(comments[0].isEmmaWilson()).toBe(true);
    expect(comments[0].body).toBe('테스트 댓글');
  });
});
```

---

## 12. 결론

- **클린 아키텍처**는 역할을 나눠서, 실수도 줄이고, 고치기도 쉽고, 테스트도 쉬운 구조예요!
- 각자 역할만 잘 지키면, 누구나 쉽게 개발할 수 있어요!
- **StubClient**로 테스트하면 서버 없이도 안전하게 개발할 수 있어요!

---

> **초등학생도 이해할 수 있도록 쉽게 설명해봤어요!**
> 궁금한 점이 있으면 언제든 질문해 주세요 :)
