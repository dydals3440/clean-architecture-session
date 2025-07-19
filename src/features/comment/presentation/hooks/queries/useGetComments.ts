import { queryOptions } from '@tanstack/react-query';

import type { GetAllCommentRequest } from '@/features/comment/infrastructure/dto/request/GetAllCommentRequest';
import { useComment } from '../../context/CommentContext';
import { QUERY_KEY } from '../queryKey';

export const useGetComments = (request: GetAllCommentRequest) => {
  const commentService = useComment();

  return queryOptions({
    queryKey: [QUERY_KEY.COMMENTS, request.postId],
    queryFn: () => commentService.getAllComment(request),
  });
};
