import CommentService from '@/features/comment/application/services/CommentService';
import { CommentClient } from '@/features/comment/infrastructure/apis/CommentClient';
import { createContext, useContext, type PropsWithChildren } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const CommentContext = createContext<CommentService | null>(null);

const commentClient = CommentClient.getInstance();
const commentService = CommentService.getInstance(commentClient);

export const CommentProvider = ({ children }: PropsWithChildren) => {
  return (
    <CommentContext.Provider value={commentService}>
      {children}
    </CommentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useComment() {
  const commentService = useContext(CommentContext);

  if (!commentService) {
    throw new Error('CommentService not found');
  }

  return commentService;
}
