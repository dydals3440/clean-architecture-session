import type { GetSinglePostRequest } from '@/features/post/application/validators/request/GetSinglePostRequest';
import { usePost } from '@/features/post/presentation/context/PostContext';
import { QUERY_KEY } from '@/features/post/presentation/hooks/queries/constants/queryKey';
import { queryOptions } from '@tanstack/react-query';

export const useGetSinglePost = (request: GetSinglePostRequest) => {
  const postService = usePost();

  return queryOptions({
    queryKey: [QUERY_KEY.POSTS, request.id],
    queryFn: () => postService.getSinglePost(request),
  });
};
