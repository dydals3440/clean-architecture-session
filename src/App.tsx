import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from '@/pages/HomePage';
import { CommentProvider } from '@/features/comment/presentation/context/CommentContext';
import { PostProvider } from '@/features/post/presentation/context/PostContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CommentProvider>
        <PostProvider>
          <HomePage />
        </PostProvider>
      </CommentProvider>
    </QueryClientProvider>
  );
}

export default App;
