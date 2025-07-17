import { useQuery } from '@tanstack/react-query';
import { useGetComments } from '@/features/comment/presentation/hooks/queries/useGetComments';
import { CommentCard } from '@/features/comment/presentation/components/CommentCard';

export const CommentSection = () => {
  const { data } = useQuery(useGetComments({ postId: 1 }));

  return data?.map((comment) => (
    <CommentCard key={comment.id} comment={comment} />
  ));
};
