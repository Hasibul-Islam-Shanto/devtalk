import { Pagination } from './common';
import { User } from './user.type';

export interface Question {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  askedBy: User;
  likes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface QuestionResponse {
  success: boolean;
  message?: string;
  question: Question;
}

export interface QuestionsResponse {
  success: boolean;
  questions: Question[];
  pagination: Pagination;
}
