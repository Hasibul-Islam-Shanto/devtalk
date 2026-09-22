import { Pagination } from './common';
import { User } from './user.type';

export interface ICommentCreateProps {
  commentableType: 'QUESTION' | 'BLOG' | 'JOB';
  commentableId: string;
  comment: string;
}

export interface IComment {
  commentor: User;
  userId: string;
  commentableType: 'QUESTION' | 'BLOG' | 'JOB';
  commentableId: string;
  comment: string;
  likes: string[];
  parentComment: null;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICommentResponse {
  success: boolean;
  message: string;
  data: IComment;
}

export interface ICommentsResponse {
  success: boolean;
  message: string;
  data: IComment[];
  pagination: Pagination;
}
