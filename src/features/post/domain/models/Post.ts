export interface Reactions {
  likes: number;
  dislikes: number;
}

export interface PostDto {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions[];
  views: number;
  userId: number;
}

export class Post {
  constructor(private readonly dto: PostDto) {}

  get id() {
    return this.dto.id;
  }

  get title() {
    return this.dto.title;
  }

  get body() {
    return this.dto.body;
  }

  get tags() {
    return this.dto.tags;
  }

  get reactions() {
    return this.dto.reactions;
  }

  get views() {
    return this.dto.views;
  }

  get userId() {
    return this.dto.userId;
  }

  // 제목에 mother 라는 단어가 포함되어 있는지 확인하는 비즈니스 규칙
  hasMotherInTitle() {
    return this.dto.title.includes('mother');
  }
}
