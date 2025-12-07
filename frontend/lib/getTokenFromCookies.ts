'use server';

import { cookies } from 'next/headers';

export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const auth = cookieStore.get('authentication');
  const token = auth?.value;

  if (!token) {
    return null;
  }

  return token;
}
