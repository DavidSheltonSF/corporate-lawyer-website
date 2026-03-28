import { API_URL } from '@/config/api';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';
import { SafeUser } from '@/types/SafeUser';
import { WithId } from '@/types/WithId';

export async function deleteUser(id: string): Promise<WithId<SafeUser>> {
  const token = await getTokenFromCookies();
  const response = await fetch(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: token,
    },
    method: 'DELETE',
  });

  const json = await response.json();

  if (!response.ok) {
    throw Error(json.message);
  }

  return json.data;
}
