import { fetcher } from '@/shared/libs/fetcher';

import { API_ENDPOINTS } from '@/features/comment/constants/url';
import type {
  GetSingleCommentRequest,
  Comment,
  GetCommentsRequest,
  GetCommentsResponse,
} from '@/features/comment/types/comment';

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
