# PostMapper 사용 가이드

PostMapper는 Clean Architecture의 Application Layer에서 데이터 변환을 담당하는 클래스입니다. 다양한 레이어 간 데이터 변환을 위한 메소드들을 제공합니다.

## 프로젝트 구조 분석

### 현재 레이어 구조

```
src/features/post/
├── domain/           # 도메인 레이어 (핵심 비즈니스 로직)
│   ├── models/       # 도메인 모델 (Post.ts)
│   └── types/        # 도메인 타입 정의 (PostEntity, Reactions)
├── application/      # 애플리케이션 레이어 (유스케이스)
│   ├── mappers/      # 데이터 변환 (PostMapper.ts)
│   ├── services/     # 애플리케이션 서비스 (PostService.ts)
│   └── validators/   # 요청 검증 (GetSinglePostRequest.ts)
├── infrastructure/   # 인프라스트럭처 레이어 (외부 의존성)
│   ├── apis/         # API 클라이언트 (PostClient.ts)
│   └── dto/          # 데이터 전송 객체
└── presentation/     # 프레젠테이션 레이어 (UI)
    ├── context/      # React Context (PostContext.tsx)
    ├── hooks/        # React Query Hooks (useGetSinglePost.ts)
    └── components/   # React 컴포넌트
```

## 변환 메소드별 사용 사례

### 1. `toDto(post: Post): PostDto`

**목적**: 도메인 객체를 DTO로 변환
**사용 시나리오**:

- Application Service에서 Infrastructure Layer로 데이터를 전달할 때
- Presentation Layer에 데이터를 전달할 때

**현재 프로젝트 예시**:

```typescript
// PostService에서 단일 포스트 조회 후 클라이언트에 반환
public async getSinglePost(request: GetSinglePostRequest) {
  const singlePost = await this.postClient.getSinglePost(request);
  const post = PostMapper.toDomain(singlePost);

  // 도메인 객체를 DTO로 변환하여 반환
  return PostMapper.toDto(post);
}
```

**기능 추가 예시**: 포스트 조회수 증가 기능

```typescript
// PostService에 새로운 메소드 추가
public async getSinglePostWithViewIncrement(request: GetSinglePostRequest) {
  const singlePost = await this.postClient.getSinglePost(request);
  const post = PostMapper.toDomain(singlePost);

  // 도메인 로직: 조회수 증가 (Post 모델에 메소드 추가 필요)
  post.incrementViews();

  // 변경된 도메인 객체를 DTO로 변환
  return PostMapper.toDto(post);
}
```

### 2. `toDomain(dto: PostDto): Post`

**목적**: DTO를 도메인 객체로 변환
**사용 시나리오**:

- Infrastructure Layer에서 받은 데이터를 도메인 객체로 변환할 때
- 비즈니스 로직을 적용하기 전에 데이터 변환이 필요할 때

**현재 프로젝트 예시**:

```typescript
// PostService에서 PostClient 데이터를 도메인 객체로 변환
public async getSinglePost(request: GetSinglePostRequest) {
  const singlePost = await this.postClient.getSinglePost(request);
  const post = PostMapper.toDomain(singlePost); // DTO → Domain

  return PostMapper.toDto(post);
}
```

**기능 추가 예시**: 포스트 검증 기능

```typescript
// PostService에 새로운 메소드 추가
public async validateAndCreatePost(postDto: PostDto) {
  const post = PostMapper.toDomain(postDto);

  // 도메인 검증 로직 (Post 모델에 메소드 추가 필요)
  if (!post.isValidTitle()) {
    throw new Error('제목이 유효하지 않습니다.');
  }

  // PostClient에 저장 메소드 추가 필요
  return await this.postClient.createPost(PostMapper.toDto(post));
}
```

### 3. `fromEntity(entity: PostEntity): Post`

**목적**: Entity를 도메인 객체로 변환
**사용 시나리오**:

- Repository에서 반환된 Entity를 도메인 객체로 변환할 때
- 데이터베이스 조회 결과를 도메인 로직에 사용할 때

**현재 프로젝트 상황**:

```typescript
// 현재는 Infrastructure Layer에서 외부 API 서버와 통신
// PostClient가 API 응답 DTO를 반환하므로 fromEntity는 사용하지 않음
// fromEntity는 데이터베이스 Entity를 다룰 때만 사용 가능

// 현재 구조: API Server → PostClient → DTO → PostMapper.toDomain() → Domain
// fromEntity 사용 불가: 데이터베이스 Entity가 없음
```

**기능 추가 예시**: 포스트 통계 기능

```typescript
// PostService에 새로운 메소드 추가
public async getPostStatistics(id: number) {
  // 현재는 PostClient를 통해 DTO를 받아서 도메인 객체로 변환
  const request = { id };
  const postDto = await this.postClient.getSinglePost(request);
  const post = PostMapper.toDomain(postDto);

  // 도메인 로직: 통계 계산
  const statistics = {
    hasMotherInTitle: post.hasMotherInTitle(),
    hasMatthewInTitle: post.hasMatthewInTitle(),
    viewCount: post.views,
    reactionCount: post.reactions.total
  };

  return statistics;
}
```

### 4. `toDomainList(dtos: PostDto[]): Post[]`

**목적**: DTO 배열을 도메인 객체 배열로 변환
**사용 시나리오**:

- 여러 포스트 데이터를 한 번에 도메인 객체로 변환할 때
- 배치 처리나 목록 조회 시 사용

**기능 추가 예시**: 포스트 목록 조회 기능

```typescript
// PostClient에 메소드 추가 필요
public async getAllPosts(): Promise<PostDto[]> {
  const postDtos = await this.postClient.getAllPosts();
  return PostMapper.toDomainList(postDtos);
}
```

**기능 추가 예시**: 포스트 필터링 기능

```typescript
// PostService에 새로운 메소드 추가
public async getFilteredPosts(filter: PostFilter): Promise<Post[]> {
  const postDtos = await this.postClient.getAllPosts();
  const posts = PostMapper.toDomainList(postDtos);

  // 도메인 로직: 필터링
  return posts.filter(post => {
    if (filter.hasMotherInTitle) {
      return post.hasMotherInTitle();
    }
    if (filter.hasMatthewInTitle) {
      return post.hasMatthewInTitle();
    }
    return true;
  });
}
```

### 5. `fromEntityList(entities: PostEntity[]): Post[]`

**목적**: Entity 배열을 도메인 객체 배열로 변환
**사용 시나리오**:

- Repository에서 여러 Entity를 조회한 후 도메인 객체로 변환할 때
- 데이터베이스 조회 결과를 일괄 처리할 때

**현재 프로젝트 상황**:

```typescript
// 현재는 Infrastructure Layer에서 외부 API 서버와 통신
// PostClient가 API 응답 DTO 배열을 반환하므로 fromEntityList는 사용하지 않음
// fromEntityList는 데이터베이스 Entity 배열을 다룰 때만 사용 가능

// 현재 구조: API Server → PostClient → DTO[] → PostMapper.toDomainList() → Domain[]
// fromEntityList 사용 불가: 데이터베이스 Entity가 없음
```

**기능 추가 예시**: 포스트 목록 조회 (Repository 패턴)

```typescript
// PostRepository 구현 후 사용 (현재는 사용 불가)
public async findAll(): Promise<Post[]> {
  const entities = await this.postRepository.findAllPosts();
  return PostMapper.fromEntityList(entities);
}
```

**기능 추가 예시**: 포스트 분석 기능

```typescript
// PostService에 새로운 메소드 추가
public async analyzePosts(): Promise<PostAnalysis> {
  // 현재는 PostClient를 통해 DTO 배열을 받아서 도메인 객체로 변환
  const postDtos = await this.postClient.getAllPosts();
  const posts = PostMapper.toDomainList(postDtos);

  // 도메인 로직: 분석
  const analysis = {
    totalPosts: posts.length,
    postsWithMother: posts.filter(p => p.hasMotherInTitle()).length,
    postsWithMatthew: posts.filter(p => p.hasMatthewInTitle()).length,
    averageViews: posts.reduce((sum, p) => sum + p.views, 0) / posts.length
  };

  return analysis;
}
```

### 6. `toDtoList(posts: Post[]): PostDto[]`

**목적**: 도메인 객체 배열을 DTO 배열로 변환
**사용 시나리오**:

- 여러 도메인 객체를 한 번에 DTO로 변환하여 반환할 때
- 목록 조회 결과를 클라이언트에 전달할 때

**기능 추가 예시**: 포스트 목록 반환

```typescript
// PostService에서 포스트 목록 반환
public async getPostsByUser(userId: number): Promise<PostDto[]> {
  // 현재는 PostClient를 통해 DTO 배열을 받아서 도메인 객체로 변환 후 다시 DTO로 변환
  const postDtos = await this.postClient.getPostsByUser(userId);
  const posts = PostMapper.toDomainList(postDtos);
  return PostMapper.toDtoList(posts);
}
```

**기능 추가 예시**: 포스트 검색 기능

```typescript
// PostService에 새로운 메소드 추가
public async searchPosts(keyword: string): Promise<PostDto[]> {
  // 현재는 PostClient를 통해 모든 포스트를 받아서 필터링
  const allPostDtos = await this.postClient.getAllPosts();
  const posts = PostMapper.toDomainList(allPostDtos);

  // 도메인 로직: 검색
  const filteredPosts = posts.filter(post =>
    post.title.includes(keyword) || post.body.includes(keyword)
  );

  return PostMapper.toDtoList(filteredPosts);
}
```

## 현재 프로젝트의 데이터 흐름

### 1. 단일 포스트 조회 흐름

```
Presentation Layer (useGetSinglePost)
    ↓
Application Layer (PostService.getSinglePost)
    ↓
Infrastructure Layer (PostClient.getSinglePost)
    ↓
External API
    ↓
PostMapper.toDomain (DTO → Domain)
    ↓
PostMapper.toDto (Domain → DTO)
    ↓
Presentation Layer (React Component)
```

### 2. 의존성 주입 패턴

```typescript
// PostContext.tsx에서 의존성 주입
const postClient = PostClient.getInstance();
const postService = PostService.getInstance(postClient);

// Presentation Layer에서 사용
const postService = usePost();
const { data } = useQuery(useGetSinglePost(request));
```

## Clean Architecture 준수 여부 분석

### ✅ 잘 구현된 부분

1. **레이어 분리**: Domain, Application, Infrastructure, Presentation 레이어가 명확히 분리됨
2. **의존성 방향**: 외부 → 내부 방향으로 의존성이 흐름 (Infrastructure → Application → Domain)
3. **인터페이스 분리**: PostClientImplements 인터페이스를 통한 추상화
4. **도메인 중심**: Post 도메인 모델이 비즈니스 로직을 포함
5. **의존성 주입**: PostContext를 통한 의존성 주입 패턴 구현

### ⚠️ 개선 가능한 부분

1. **API 기반 구조**: 현재는 외부 API 서버와 통신하는 구조로, 데이터베이스 Entity가 없어 `fromEntity`, `fromEntityList` 메소드 사용 불가
2. **Entity 변환 메소드 미사용**: `fromEntity`, `fromEntityList` 메소드가 현재 API 기반 구조에서는 사용되지 않음 (데이터베이스 Entity가 없음)
3. **도메인 서비스 부족**: 복잡한 비즈니스 로직을 위한 도메인 서비스가 없음
4. **에러 처리**: 도메인 예외와 인프라스트럭처 예외의 구분이 명확하지 않음

### 🔧 권장 개선사항

1. **현재 API 기반 구조 유지**:

```typescript
// 현재 PostClient 기반 구조가 적절함
// 외부 API 서버와 통신하는 구조에서는 Repository 패턴이 불필요
export interface PostClientImplements {
  getSinglePost(request: GetSinglePostRequest): Promise<PostDto>;
  getAllPosts(): Promise<PostDto[]>;
  createPost(post: PostDto): Promise<PostDto>;
}
```

2. **Entity 변환 메소드 제거 고려**:

```typescript
// fromEntity, fromEntityList 메소드는 현재 구조에서 사용되지 않음
// API 기반 구조에서는 toDomain, toDomainList만 사용
// 필요시 제거하거나 주석 처리 고려
```

2. **도메인 서비스 추가**:

```typescript
// PostDomainService 추가
export class PostDomainService {
  static validatePostCreation(post: Post): boolean {
    // 복잡한 비즈니스 규칙 검증
  }
}
```

3. **도메인 예외 정의**:

```typescript
// PostDomainException 추가
export class PostDomainException extends Error {
  constructor(message: string) {
    super(message);
  }
}
```

## 사용 패턴

### 1. 현재 프로젝트 패턴

```typescript
// Infrastructure → Domain → Infrastructure
const dto = await client.getData();
const domain = PostMapper.toDomain(dto);
// 도메인 로직 적용
return PostMapper.toDto(domain);
```

### 2. 현재 PostClient 패턴

```typescript
// DTO → Domain → DTO
const dtos = await client.getAllPosts();
const domains = PostMapper.toDomainList(dtos);
// 도메인 로직 적용
return PostMapper.toDtoList(domains);
```

### 3. 현재 구조에서 사용 가능한 메소드

```typescript
// toDomain, toDomainList, toDto, toDtoList만 사용
// fromEntity, fromEntityList는 데이터베이스 Entity가 없어 사용 불가
const dtos = await client.getAllPosts();
const domains = PostMapper.toDomainList(dtos);
return PostMapper.toDtoList(domains);
```

## 주의사항

1. **타입 안전성**: 모든 변환 메소드는 타입 안전성을 보장합니다.
2. **불변성**: 도메인 객체는 불변성을 유지합니다.
3. **성능**: 대량 데이터 처리 시 `toDomainList`, `toDtoList`를 사용하세요.
4. **비즈니스 로직**: 도메인 객체로 변환 후 비즈니스 로직을 적용하세요.
5. **의존성 방향**: 항상 외부 → 내부 방향으로 의존성을 유지하세요.
6. **API 기반 구조**: 현재는 외부 API 서버와 통신하므로 `fromEntity`, `fromEntityList` 메소드는 사용하지 않습니다.
