import PostService from '@/features/post/application/services/PostService';
import { PostClient } from '@/features/post/infrastructure/apis/PostClient';
import { createContext, use, type PropsWithChildren } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const PostContext = createContext<PostService | null>(null);

const postClient = PostClient.getInstance();
const postService = PostService.getInstance(postClient);

export const PostProvider = ({ children }: PropsWithChildren) => {
  return (
    <PostContext.Provider value={postService}>{children}</PostContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePost = () => {
  const postService = use(PostContext);

  if (!postService) {
    throw new Error('PostService not found');
  }

  return postService;
};
