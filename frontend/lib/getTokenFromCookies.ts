'use server';

import { cookies } from 'next/headers';

export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken');
  const token = authToken?.value;

  return token || null;
}
