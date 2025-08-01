import { API_ENDPOINTS } from '@/features/post/constants/url';
import type {
  GetPostsRequest,
  GetSinglePostRequest,
} from '@/features/post/types/post';

export const getPosts = async (request: GetPostsRequest) => {
  const response = await fetch(
    `${API_ENDPOINTS.POSTS}?limit=${request.limit}&page=${request.page}`
  );
  const data = await response.json();

  return data;
};

export const getSinglePost = async (request: GetSinglePostRequest) => {
  const response = await fetch(`${API_ENDPOINTS.POSTS}/${request.id}`);
  const data = await response.json();

  return data;
};
