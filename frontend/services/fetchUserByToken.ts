import { API_URL } from '@/config/api';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';

export async function fetchUserByToken(token: string): Promise<WithId<User> | null> {
  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  if (json.status > 300) {
    return null;
  }

  return json.data;
}
