'use server';
import { QuestionResponse } from '@/types/question';
import { post } from '@/utils/methods';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const createQuestion = async (data: {
  title: string;
  description: string;
  tags: string[];
}) => {
  try {
    const cookieStore = await cookies();
    const response = await post<QuestionResponse>('/api/questions', data, {
      isAuthenticated: true,
      token: cookieStore.get('accessToken')?.value || '',
    });
    return response;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'There was an error creating the question. Please try again.',
    };
  }
};

export const likeQuestion = async (questionId: string) => {
  try {
    const cookieStore = await cookies();
    const response = await post<QuestionResponse>(
      `/api/questions/likes/${questionId}`,
      {},
      {
        isAuthenticated: true,
        token: cookieStore.get('accessToken')?.value || '',
      },
    );
    revalidatePath(`/questions/${questionId}`);

    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'There was an error liking the question. Please try again.',
    };
  }
};
