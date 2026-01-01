import { API_URL } from '@/config/api';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';

export async function fetchUserByToken(token: string): Promise<WithId<User>> {
  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw Error(await response.text());
  }

  const json = await response.json();

  return json.data;
}
