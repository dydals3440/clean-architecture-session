import type { Reactions } from './reactions';

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions[];
  views: number;
  userId: number;
}
