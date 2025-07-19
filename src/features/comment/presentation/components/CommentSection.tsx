import { useQuery } from '@tanstack/react-query';

import { useGetComments } from '../hooks/queries/useGetComments';
import { CommentCard } from './CommentCard';

export const CommentSection = () => {
  const { data } = useQuery(useGetComments({ postId: 1 }));

  return data?.map((comment) => (
    <CommentCard key={comment.id} comment={comment} />
  ));
};
