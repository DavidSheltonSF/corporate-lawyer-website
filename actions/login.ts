'use server';

import { authenticateUser } from '@/services/authenticateUser';
import { isString } from '@/lib/isString';
import { cookies } from 'next/headers';

export async function login(
  formData: FormData
): Promise<{ error: boolean; message: string }> {
  const token = await authenticateUser(formData);

  if (!token || !isString(token)) {
    return { error: true, message: 'Email or password is incorrect' };
  }

  const cookiesStore = await cookies();
  cookiesStore.set('authentication', token, { httpOnly: true });

  return { error: false, message: '' };
}
