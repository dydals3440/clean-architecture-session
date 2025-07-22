import type { Reactions } from './reactions';

export interface PostDto {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
  views: number;
  userId: number;
}
