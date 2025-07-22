# ValueObject 사용 가이드

## ValueObject란?

ValueObject는 도메인 주도 설계(DDD)에서 값의 의미를 표현하는 불변 객체입니다. 단순한 원시 타입 대신 비즈니스 규칙과 유효성 검증을 포함한 객체를 사용합니다.

## ValueObject 사용 전후 비교

### 1. PostTitle ValueObject 사용 전

```typescript
export class Post implements PostEntity {
  private _id: number;
  private _title: string; // 단순한 string 타입
  private _body: string;
  // ... 기타 필드들

  constructor(dto: PostEntity) {
    this._id = dto.id;
    this._title = dto.title; // 유효성 검증 없음
    this._body = dto.body;
    // ...
  }

  get title() {
    return this._title;
  }

  // 비즈니스 로직이 Post 클래스에 흩어져 있음
  hasMotherInTitle() {
    return this._title.toLowerCase().includes('mother');
  }

  hasMatthewInTitle() {
    return this._title.toLowerCase().includes('matthew');
  }
}
```

### 2. PostTitle ValueObject 사용 후

```typescript
export class Post implements PostEntity {
  private _id: number;
  private _title: PostTitle; // ValueObject 사용
  private _body: string;
  // ... 기타 필드들

  constructor(dto: PostEntity) {
    this._id = dto.id;
    this._title = new PostTitle(dto.title); // 생성 시 유효성 검증
    this._body = dto.body;
    // ...
  }

  get title() {
    return this._title.value; // ValueObject의 값 반환
  }

  // 비즈니스 로직이 PostTitle ValueObject에 캡슐화됨
  hasMotherInTitle() {
    return this._title.hasMotherInTitle();
  }

  hasMatthewInTitle() {
    return this._title.hasMatthewInTitle();
  }
}
```

## 주요 차이점과 장점

### 1. **유효성 검증 강제**

#### 사용 전

```typescript
// 잘못된 제목이 들어와도 컴파일 에러 없음
const post = new Post({
  id: 1,
  title: '', // 빈 문자열 허용
  body: '내용',
  // ...
});
```

#### 사용 후

```typescript
// 잘못된 제목 시 런타임 에러 발생
const post = new Post({
  id: 1,
  title: '', // Error: 제목은 비어있을 수 없습니다.
  body: '내용',
  // ...
});
```

### 2. **비즈니스 로직 캡슐화**

#### 사용 전

```typescript
// Post 클래스에 제목 관련 로직이 흩어져 있음
export class Post {
  hasMotherInTitle() {
    return this._title.toLowerCase().includes('mother');
  }

  hasMatthewInTitle() {
    return this._title.toLowerCase().includes('matthew');
  }

  // 제목 길이 체크 로직이 여기저기 흩어져 있을 수 있음
  isValidTitleLength() {
    return this._title.length > 0 && this._title.length <= 100;
  }
}
```

#### 사용 후

```typescript
// PostTitle ValueObject에 제목 관련 로직이 집중됨
export class PostTitle extends ValueObject<string> {
  protected validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error('제목은 비어있을 수 없습니다.');
    }
    if (value.length > 100) {
      throw new Error('제목은 100자를 초과할 수 없습니다.');
    }
  }

  public hasMotherInTitle(): boolean {
    return this._value.toLowerCase().includes('mother');
  }

  public hasMatthewInTitle(): boolean {
    return this._value.toLowerCase().includes('matthew');
  }
}

// Post 클래스는 간단해짐
export class Post {
  hasMotherInTitle() {
    return this._title.hasMotherInTitle();
  }

  hasMatthewInTitle() {
    return this._title.hasMatthewInTitle();
  }
}
```

### 3. **불변성 보장**

#### 사용 전

```typescript
// 실수로 제목을 변경할 수 있음
const post = new Post({...});
post._title = "새로운 제목"; // 직접 접근 가능 (잠재적 버그)
```

#### 사용 후

```typescript
// ValueObject는 불변성을 보장
const post = new Post({...});
// post._title = new PostTitle("새로운 제목"); // 컴파일 에러
// post._title._value = "새로운 제목"; // 런타임 에러 (Object.freeze)
```

### 4. **타입 안전성**

#### 사용 전

```typescript
// string 타입이므로 어떤 문자열이든 할당 가능
let title: string = '정상적인 제목';
title = ''; // 빈 문자열도 할당 가능
title = 'a'.repeat(200); // 200자 제목도 할당 가능
```

#### 사용 후

```typescript
// PostTitle 타입이므로 유효한 제목만 할당 가능
let title: PostTitle = new PostTitle('정상적인 제목');
// title = new PostTitle(""); // 런타임 에러
// title = new PostTitle("a".repeat(200)); // 런타임 에러
```

### 5. **재사용성과 테스트 용이성**

#### 사용 전

```typescript
// 제목 관련 로직을 여러 곳에서 중복 구현
class PostService {
  validateTitle(title: string): boolean {
    return title.length > 0 && title.length <= 100;
  }
}

class PostValidator {
  isValidTitle(title: string): boolean {
    return title.length > 0 && title.length <= 100; // 중복 코드
  }
}
```

#### 사용 후

```typescript
// PostTitle ValueObject를 재사용
class PostService {
  createPost(title: string) {
    const postTitle = new PostTitle(title); // 유효성 검증 자동 실행
    // ...
  }
}

class PostValidator {
  isValidTitle(title: string): boolean {
    try {
      new PostTitle(title); // 동일한 검증 로직 재사용
      return true;
    } catch {
      return false;
    }
  }
}
```

## 실제 사용 예시

### 1. **Post 생성 시**

```typescript
// PostService에서 사용
public async createPost(postDto: PostDto) {
  try {
    const post = PostMapper.toDomain(postDto); // PostTitle 유효성 검증 자동 실행
    return await this.postClient.createPost(PostMapper.toDto(post));
  } catch (error) {
    // PostTitle 생성 실패 시 에러 처리
    throw new Error(`포스트 생성 실패: ${error.message}`);
  }
}
```

### 2. **비즈니스 로직에서 사용**

```typescript
// Post 도메인에서 사용
public hasSpecialKeywords(): boolean {
  return this._title.hasMotherInTitle() || this._title.hasMatthewInTitle();
}

public getTitleInfo() {
  return {
    length: this._title.getLength(),
    hasMother: this._title.hasMotherInTitle(),
    hasMatthew: this._title.hasMatthewInTitle(),
    value: this._title.toString()
  };
}
```

## 결론

ValueObject를 사용함으로써:

1. **타입 안전성**: 컴파일 타임에 타입 체크
2. **유효성 검증 강제**: 런타임에 잘못된 값 방지
3. **비즈니스 로직 캡슐화**: 관련 로직을 한 곳에 집중
4. **불변성 보장**: 예상치 못한 상태 변경 방지
5. **재사용성**: 여러 곳에서 동일한 규칙 적용
6. **테스트 용이성**: 각 ValueObject를 독립적으로 테스트
7. **의도 명확화**: 코드를 읽는 사람에게 의도가 명확히 전달

이러한 장점들로 인해 ValueObject는 도메인 모델의 안정성과 유지보수성을 크게 향상시킵니다.
