'use server';
import { authenticateUser } from '@/services/users/authenticateUser';
import { cookies } from 'next/headers';

export async function login(formData: FormData): Promise<void> {
  const token = await authenticateUser(formData);
  const cookiesStore = await cookies();
  //cookiesStore.set('authToken', token, { httpOnly: true, secure: true, sameSite: 'none' });
  cookiesStore.set('authToken', token, { httpOnly: true });
}
