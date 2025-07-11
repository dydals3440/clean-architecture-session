import { useQuery } from '@tanstack/react-query';
import { useGetSinglePost } from '@/hooks/queries/useGetSinglePost';

export const Post = () => {
  const { data: post } = useQuery(useGetSinglePost({ id: 1 }));

  return (
    <div className='bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm hover:shadow-md transition-shadow duration-200'>
      <div className='mb-4'>
        <h1 className='text-xl font-bold text-gray-900 mb-2 leading-tight'>
          {post?.title}
        </h1>
        <div className='flex items-center text-sm text-gray-500 space-x-2'>
          <span>작성자: 익명</span>
          <span>•</span>
          <span>방금 전</span>
        </div>
      </div>

      <div className='prose prose-sm max-w-none'>
        <p className='text-gray-700 leading-relaxed whitespace-pre-wrap'>
          {post?.body}
        </p>
      </div>

      <div className='flex items-center justify-between mt-6 pt-4 border-t border-gray-100'>
        <div className='flex items-center space-x-6'>
          <button className='flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors duration-150'>
            <span>👍</span>
            <span>좋아요</span>
          </button>
          <button className='flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors duration-150'>
            <span>💬</span>
            <span>댓글</span>
          </button>
          <button className='flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors duration-150'>
            <span>📤</span>
            <span>공유</span>
          </button>
        </div>
      </div>
    </div>
  );
};
