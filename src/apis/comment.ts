import { API_ENDPOINTS } from '@/constants/api';
import { fetcher } from '@/libs/fetcher';
import type {
  GetSingleCommentRequest,
  Comment,
  GetCommentsRequest,
  GetCommentsResponse,
} from '@/types/comment';

export const getSingleComment = async (request: GetSingleCommentRequest) => {
  const data = await fetcher<Comment>(
    `${API_ENDPOINTS.COMMENTS}/${request.id}`
  );

  return data;
};

export const getComments = async (request: GetCommentsRequest) => {
  const data = await fetcher<GetCommentsResponse>(
    `${API_ENDPOINTS.COMMENTS}?postId=${request.postId}`
  );

  return data;
};
