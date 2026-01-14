'use server';

import { cookies } from 'next/headers';

export async function getTokenFromCookies(): Promise<string> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken');
  const token = authToken?.value;

  if (!token) {
    throw Error('Token from cookies was not found');
  }

  return token;
}
