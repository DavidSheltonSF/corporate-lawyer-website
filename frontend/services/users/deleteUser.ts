import { API_URL } from '@/config/api';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';
import { SafeUser } from '@/types/SafeUser';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';

export async function deleteUser(id: string): Promise<WithId<SafeUser>> {
  const token = await getTokenFromCookies();
  const response = await apiFetch(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: token,
    },
    method: 'DELETE',
  });

  const json = await response.json();

  return json.data;
}
