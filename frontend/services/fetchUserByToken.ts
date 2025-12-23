import { API_URL } from '@/config/api';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';

export async function fetchUserByToken(token: string): Promise<WithId<User> | null> {
  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: token,
    },
  });

  const data = await response.json();

  if (data.status > 300) {
    return null;
  }

  return data.user;
}
