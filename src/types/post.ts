interface Reactions {
  likes: number;
  dislikes: number;
}

export interface GetSinglePostRequest {
  id: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions[];
  views: number;
  userId: number;
}

export interface GetPostsRequest {
  limit: number;
  page: number;
}

export interface GetPostsResponse {
  posts: Post[];
  total: number;
  limit: number;
  page: number;
}
