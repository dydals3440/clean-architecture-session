export interface Comment {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

export interface GetAllCommentResponse {
  comments: Comment[];
  limit: number;
  skip: number;
  total: number;
}
