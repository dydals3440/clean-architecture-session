import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useComment } from '@/features/comment/presentation/context/CommentContext';
import { QUERY_KEY } from '@/features/comment/presentation/hooks/queryKey';
import type { CommentResponseDto } from '@/features/comment/application/validators/response/CommentResponseDto';

interface LikeMutationParams {
  commentDto: CommentResponseDto;
  userId: number;
}

export const useLikeMutation = () => {
  const commentService = useComment();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ commentDto, userId }: LikeMutationParams) => {
      const comment = commentService.createCommentModel(commentDto);
      return commentService.like(comment, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.COMMENTS],
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
