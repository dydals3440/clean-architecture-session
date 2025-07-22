import type { Reactions } from '@/features/post/domain/types/reaction.types';

export interface PostEntity {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
  views: number;
  userId: number;
}
