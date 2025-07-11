import { queryOptions } from '@tanstack/react-query';
import { getSinglePost } from '@/apis/post';
import { QUERY_KEY } from '@/constants/queryKey';
import type { GetSinglePostRequest } from '@/types/post';

export const useGetSinglePost = (request: GetSinglePostRequest) => {
  return queryOptions({
    queryKey: [QUERY_KEY.POSTS, request.id],
    queryFn: () => getSinglePost(request),
  });
};
