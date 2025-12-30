'use server';
import { authenticateUser } from '@/services/authenticateUser';
import { cookies } from 'next/headers';

export async function login(formData: FormData): Promise<void> {
  const token = await authenticateUser(formData);
  const cookiesStore = await cookies();
  cookiesStore.set('authentication', token, { httpOnly: true });
}
