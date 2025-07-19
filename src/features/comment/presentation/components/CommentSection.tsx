import { useQuery } from '@tanstack/react-query';

import { CommentCard } from './CommentCard';
import { useGetComments } from '../hooks/queries/useGetComments';

export const CommentSection = () => {
  const { data } = useQuery(useGetComments({ postId: 1 }));

  return data?.map((comment) => (
    <CommentCard key={comment.id} comment={comment} />
  ));
};
