'use server';
import { authenticateUser } from '@/services/users/authenticateUser';
import { ActionResponse } from '@/types/ActionResponse';
import { cookies } from 'next/headers';

export async function login(formData: FormData): Promise<ActionResponse> {
  const response = await authenticateUser(formData);

  if (!response.success) {
    return response;
  }

  const token = response.data;

  const cookiesStore = await cookies();
  //cookiesStore.set('authToken', token, { httpOnly: true, secure: true, sameSite: 'none' });
  cookiesStore.set('authToken', token, { httpOnly: true });

  return response;
}
