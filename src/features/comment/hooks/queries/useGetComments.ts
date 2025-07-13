import { queryOptions } from '@tanstack/react-query';
import { getComments } from '@/features/comment/apis/comment';
import { QUERY_KEY } from '@/features/comment/constants/queryKey';
import type { GetCommentsRequest } from '@/features/comment/types/comment';

export const useGetComments = (request: GetCommentsRequest) => {
  return queryOptions({
    queryKey: [QUERY_KEY.COMMENTS, request.postId],
    queryFn: () => getComments(request),
  });
};
