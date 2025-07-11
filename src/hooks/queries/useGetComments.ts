import { queryOptions } from '@tanstack/react-query';
import { getComments } from '@/apis/comment';
import { QUERY_KEY } from '@/constants/queryKey';
import type { GetCommentsRequest } from '@/types/comment';

export const useGetComments = (request: GetCommentsRequest) => {
  return queryOptions({
    queryKey: [QUERY_KEY.COMMENTS, request.postId],
    queryFn: () => getComments(request),
  });
};
