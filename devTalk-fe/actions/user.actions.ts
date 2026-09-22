'use server';
import { cookies } from 'next/headers';
import { patch } from '@/utils/methods';
import { UserFormData } from '@/schemas/user.schema';
import { IUserResponse } from '@/types/user.type';
import { revalidatePath } from 'next/cache';

export const updateUser = async (id: string, data: UserFormData) => {
  try {
    const cookieStore = await cookies();
    const response = await patch<IUserResponse>(
      `/api/users/profile/${id}`,
      data,
      {
        isAuthenticated: true,
        token: cookieStore.get('accessToken')?.value || '',
      },
    );
    revalidatePath(`/profile`);
    return {
      success: true,
      user: response.user,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'There was an error updating the user. Please try again.',
    };
  }
};
