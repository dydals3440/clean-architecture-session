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

export interface GetSingleCommentRequest {
  id: number;
}

export interface GetCommentsRequest {
  postId: number;
}

export interface GetCommentsResponse {
  comments: Comment[];
  limit: number;
  skip: number;
  total: number;
}
