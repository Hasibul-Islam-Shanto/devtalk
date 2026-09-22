'use client';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { MoreVertical } from 'lucide-react';
import dynamic from 'next/dynamic';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { IComment } from '@/types/comment';
import { useAuthStore } from '@/store/auth.store';
import { formatDistanceToNow } from 'date-fns';
import { deleteComment, likesComment } from '@/actions/comment.action';
import { logError } from '@/utils/apiError';
import LikeButton from '../buttons/like-button';
import { useTransition } from 'react';

const MDEditorMarkdown = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default.Markdown),
  {
    ssr: false,
    loading: () => <div className="text-muted-foreground">Loading...</div>,
  },
);

const Comment = ({ comment }: { comment: IComment }) => {
  const { user } = useAuthStore();
  const [isDeleting, startDeleting] = useTransition();
  const isOwner = user?._id === comment.commentor?._id;

  const handleDelete = async () => {
    startDeleting(async () => {
      try {
        await deleteComment(comment._id);
      } catch (error) {
        logError(error, 'CommentDelete');
      }
    });
  };

  return (
    <div className="space-y-4">
      <Card key={comment._id} className="bg-card border-border rounded-lg p-4">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={comment?.commentor?.profileImage || ''}
              alt={comment?.commentor?.name}
            />
            <AvatarFallback className="font-bold">
              {comment?.commentor?.username?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-foreground text-sm font-semibold">
                  {comment?.commentor?.name}
                </span>
                <span className="text-muted-foreground font-mono text-xs">
                  @{comment?.commentor?.username}
                </span>
                <span className="text-muted-foreground text-xs">•</span>
                <span className="text-muted-foreground text-xs">
                  {formatDistanceToNow(new Date(comment?.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              {isOwner && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={handleDelete}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <div className="prose prose-invert prose-sm max-w-none">
              <MDEditorMarkdown
                source={comment.comment}
                style={{
                  whiteSpace: 'pre-wrap',
                  background: 'transparent',
                }}
              />
            </div>

            <div className="flex items-center gap-4">
              <LikeButton
                id={comment?._id || ''}
                likesCount={comment?.likes?.length || 0}
                likes={comment?.likes || []}
                likeFunction={likesComment}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Comment;
