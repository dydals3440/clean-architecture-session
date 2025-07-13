import { useQuery } from '@tanstack/react-query';
import { useGetComments } from '@/features/comment/hooks/queries/useGetComments';
import { CommentCard } from '@/features/comment/components/CommentCard';

export const CommentSection = () => {
  const { data } = useQuery(useGetComments({ postId: 1 }));

  return data?.comments.map((comment) => (
    <CommentCard key={comment.id} comment={comment} />
  ));
};
