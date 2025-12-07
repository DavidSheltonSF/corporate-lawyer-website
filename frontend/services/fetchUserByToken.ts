import { API_URL } from '@/frontend/config/api';
import { UserProps } from '@/frontend/types/UserProps';
import { WithId } from '@/frontend/types/WithId';

export async function fetchUserByToken(token: string): Promise<WithId<UserProps> | null> {
  const response = await fetch(`${API_URL}/api/me`, {
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
