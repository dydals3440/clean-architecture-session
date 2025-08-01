import { queryOptions } from '@tanstack/react-query';
import { getSinglePost } from '@/features/post/apis/post';
import { QUERY_KEY } from '@/features/post/constants/queryKey';
import type { GetSinglePostRequest } from '@/features/post/types/post';

export const useGetSinglePost = (request: GetSinglePostRequest) => {
  return queryOptions({
    queryKey: [QUERY_KEY.POSTS, request.id],
    queryFn: () => getSinglePost(request),
  });
};
