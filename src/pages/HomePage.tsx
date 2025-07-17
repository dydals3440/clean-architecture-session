import { CommentView } from '@/features/comment/presentation/components/CommentView';
import { Post } from '@/features/post/components/Post';

export default function HomePage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <Post />
      <CommentView />
    </div>
  );
}
