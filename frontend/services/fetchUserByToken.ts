import { API_URL } from '@/config/api';
import { UserProps } from '@/types/UserProps';
import { WithId } from '@/types/WithId';

export async function fetchUserByToken(token: string): Promise<WithId<UserProps> | null> {
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
