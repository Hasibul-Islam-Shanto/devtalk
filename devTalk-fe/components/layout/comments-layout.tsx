import { ErrorMessage } from '@/components/Errors';
import { IComment, ICommentsResponse } from '@/types/comment';
import CommentBox from '../comment/CommentBox';
import CommentsContainer from '../comment/comments-container';
import { get } from '@/utils/methods';

const CommentsContainerLayout = async ({
  id,
  commentableType,
}: {
  id: string;
  commentableType: 'QUESTION' | 'BLOG' | 'JOB';
}) => {
  let comments: IComment[] = [];
  let pagination = null;
  let error = null;

  try {
    const response = await get<ICommentsResponse>(
      `/api/comments/${commentableType}/${id}`,
      {
        retry: 2,
        timeout: 5000,
      },
    );
    comments = response.data;
    pagination = response.pagination;
  } catch (err) {
    error = err;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Could not load comments"
        message="Please try again in a moment."
      />
    );
  }

  return (
    <div className="space-y-5">
      <p>Comments ({pagination?.totalItems || 0})</p>
      <CommentBox id={id} commentableType={commentableType} />
      <CommentsContainer comments={comments} />
    </div>
  );
};

export default CommentsContainerLayout;
