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
  constructor(private readonly dto: CommentDto) {}

  get id() {
    return this.dto.id;
  }

  get body() {
    return this.dto.body;
  }

  get postId() {
    return this.dto.postId;
  }

  get user() {
    return this.dto.user;
  }

  isEmmaWilson(): boolean {
    return this.dto.user.fullName === 'Emma Wilson';
  }

  canLike(userId: number): boolean {
    return this.dto.user.id !== userId; // 자신의 댓글은 좋아요 불가능
  }

  //  mappers 대신 이렇게 처리할 수 도 있긴함.
  //   toDto() {
  //     return {
  //       id: this.dto.id,
  //       body: this.dto.body,
  //       postId: this.dto.postId,
  //       isEmmaWilson: this.isEmmaWilson(),
  //       user: this.dto.user,
  //     };
  //   }
}
