import { useLikeMutation } from '@/features/comment/presentation/hooks/mutations/useLikeMutation';
import { useComment } from '@/features/comment/presentation/context/CommentContext';
import type { CommentViewModelProps } from '@/features/comment/application/mappers/CommentMapper';

interface CommentCardProps {
  comment: CommentViewModelProps;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
  const { mutate } = useLikeMutation();
  const commentService = useComment();

  const userId = 1;
  const canLike = commentService.canLikeComment(comment, userId);

  return (
    <div className='bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm hover:shadow-md transition-shadow duration-200'>
      <div className='flex items-start space-x-3'>
        <div className='flex-shrink-0'>
          <div className='w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium'>
            {comment.user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
          </div>
        </div>

        <div className='flex-1 min-w-0'>
          <div className='flex items-center space-x-2 mb-1'>
            <h3 className='text-sm font-semibold text-gray-900 truncate'>
              {comment.user?.fullName || '익명 사용자'}
            </h3>
            <span className='text-red-500'>
              {comment.isEmmaWilson && '핵심 유저'}
            </span>
            <span className='text-xs text-gray-500'>•</span>
            <span className='text-xs text-gray-500'>방금 전</span>
          </div>
          <p className='text-sm text-gray-700 leading-relaxed whitespace-pre-wrap'>
            {comment.body}
          </p>

          <div className='flex items-center space-x-4 mt-2'>
            <button
              className='text-xs text-gray-500 hover:text-blue-600 transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
              onClick={() => mutate({ commentDto: comment, userId })}
              disabled={!canLike}
            >
              좋아요
            </button>
            <button className='text-xs text-gray-500 hover:text-blue-600 transition-colors duration-150'>
              답글
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
