import { queryOptions } from '@tanstack/react-query';

import type { GetSingleCommentRequest } from '@/features/comment/infrastructure/dto/request/GetSingleCommentRequest';
import { useComment } from '../../context/CommentContext';
import { QUERY_KEY } from '../queryKey';

export const useGetSingleComment = (request: GetSingleCommentRequest) => {
  const commentService = useComment();

  return queryOptions({
    queryKey: [QUERY_KEY.COMMENTS, request.id],
    queryFn: () => commentService.getSingleComment(request),
  });
};
