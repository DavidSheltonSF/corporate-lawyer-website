'use server';

import { authenticateUser } from '@/services/authenticateUser';
import { isString } from '@/lib/isString';
import { cookies } from 'next/headers';

export async function login(formData: FormData): Promise<{ error: boolean; message: string }> {
  try {
    const token = await authenticateUser(formData);

    if (!token || !isString(token)) {
      return { error: true, message: 'Email or password is incorrect' };
    }

    const cookiesStore = await cookies();
    cookiesStore.set('authentication', token, { httpOnly: true });

    return { error: false, message: '' };
  } catch (error) {
    console.log(error);
    return { error: true, message: 'Something went wrong in the server' };
  }
}
