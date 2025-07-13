import { queryOptions } from '@tanstack/react-query';
import { getSingleComment } from '@/features/comment/apis/comment';
import { QUERY_KEY } from '@/features/comment/constants/queryKey';
import type { GetSingleCommentRequest } from '@/features/comment/types/comment';

export const useGetSingleComment = (request: GetSingleCommentRequest) => {
  return queryOptions({
    queryKey: [QUERY_KEY.COMMENTS, request.id],
    queryFn: () => getSingleComment(request),
  });
};
