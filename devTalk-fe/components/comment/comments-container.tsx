import { IComment } from '@/types/comment';
import Comment from './comment';

const CommentsContainer = ({ comments }: { comments: IComment[] }) => {
  if (comments.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        No comments yet. Be the first to comment!
      </p>
    );
  }
  return (
    <>
      {comments.map(comment => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </>
  );
};

export default CommentsContainer;
