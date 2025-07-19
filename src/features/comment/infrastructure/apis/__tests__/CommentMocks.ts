import type { Comment } from '../../dto/response/GetAllCommentResponse';

export const commentMocks: Comment[] = [
  {
    id: 1,
    body: 'test',
    postId: 1,
    user: {
      id: 1,
      username: 'test',
      fullName: 'test',
    },
  },
  {
    id: 2,
    body: 'test2',
    postId: 2,
    user: {
      id: 2,
      username: 'Emma',
      fullName: 'Emma Wilson',
    },
  },

  {
    id: 3,
    body: 'test3',
    postId: 1,
    user: {
      id: 1,
      username: 'test',
      fullName: 'test',
    },
  },
];
