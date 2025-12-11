import { UserProps } from '@/types/UserProps';
import { WithId } from '@/types/WithId';

export async function fetchUserByToken(token: string): Promise<WithId<UserProps> | null> {
  const response = await fetch(`/api/me`, {
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
