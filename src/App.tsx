import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from '@/pages/HomePage';
import { CommentProvider } from '@/features/comment/presentation/context/CommentContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CommentProvider>
        <HomePage />
      </CommentProvider>
    </QueryClientProvider>
  );
}

export default App;
