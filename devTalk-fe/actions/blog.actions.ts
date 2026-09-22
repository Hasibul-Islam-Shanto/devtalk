'use server';
import { BlogResponse } from '@/types/blog';
import { post } from '@/utils/methods';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const createBlog = async (data: {
  title: string;
  description: string;
  tags: string[];
  cover: string;
}) => {
  try {
    const cookieStore = await cookies();
    const response = await post<BlogResponse>('/api/blogs', data, {
      isAuthenticated: true,
      token: cookieStore.get('accessToken')?.value || '',
    });
    revalidatePath('/blogs');
    return {
      success: true,
      message: response.message,
      data: response.blog,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'There was an error creating the blog. Please try again.',
    };
  }
};

export const likeBlog = async (blogId: string) => {
  try {
    const cookieStore = await cookies();
    const response = await post<BlogResponse>(
      `/api/blogs/likes/${blogId}`,
      {},
      {
        isAuthenticated: true,
        token: cookieStore.get('accessToken')?.value || '',
      },
    );
    revalidatePath(`/blogs/${blogId}`);

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
