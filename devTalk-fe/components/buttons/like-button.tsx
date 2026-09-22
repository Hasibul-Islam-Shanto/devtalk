'use client';

import { ThumbsUp } from 'lucide-react';
import { Button } from '../ui/button';
import { useState, useTransition } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { logError } from '@/utils/apiError';

const LikeButton = ({
  id,
  likesCount,
  likes,
  likeFunction,
}: {
  id: string;
  likesCount: number;
  likes: string[];
  likeFunction: (id: string) => Promise<{ success: boolean }>;
}) => {
  const { user, isLoggedIn } = useAuthStore();
  const [isPending, startTransition] = useTransition();
  const [optimisticLikes, setOptimisticLikes] = useState(likesCount);
  const [isLiked, setIsLiked] = useState(
    likes.includes(user?._id || '') || false,
  );
  const initialLiked = likes.includes(user?._id || '') || false;

  const handleLike = async () => {
    const newCount = isLiked ? optimisticLikes - 1 : optimisticLikes + 1;
    setOptimisticLikes(newCount);
    setIsLiked(!isLiked);

    startTransition(async () => {
      try {
        const response = await likeFunction(id);
        if (!response.success) {
          setOptimisticLikes(likesCount);
          setIsLiked(initialLiked);
        }
      } catch (error) {
        setOptimisticLikes(likesCount);
        setIsLiked(initialLiked);
        logError(error, 'LikeButton');
      }
    });
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Button
      variant={isLiked ? 'default' : 'ghost'}
      size="sm"
      onClick={handleLike}
      disabled={isPending}
      className="py-1 transition-colors duration-150 active:scale-[0.98]"
    >
      <ThumbsUp
        className={`mr-1 h-4 w-4 transition-colors duration-150 ${
          isLiked ? 'fill-current' : ''
        }`}
      />
      <span>
        {optimisticLikes}
      </span>
      <span className="ml-1">{isLiked ? 'Liked' : 'Like'}</span>
    </Button>
  );
};

export default LikeButton;
