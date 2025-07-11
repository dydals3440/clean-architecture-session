import { queryOptions } from '@tanstack/react-query';
import { getSingleComment } from '@/apis/comment';
import { QUERY_KEY } from '@/constants/queryKey';
import type { GetSingleCommentRequest } from '@/types/comment';

export const useGetSingleComment = (request: GetSingleCommentRequest) => {
  return queryOptions({
    queryKey: [QUERY_KEY.COMMENTS, request.id],
    queryFn: () => getSingleComment(request),
  });
};
