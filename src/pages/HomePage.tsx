import { CommentView } from '@/components/CommentView';
import { Post } from '@/components/Post';

export default function HomePage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <Post />
      <CommentView />
    </div>
  );
}
