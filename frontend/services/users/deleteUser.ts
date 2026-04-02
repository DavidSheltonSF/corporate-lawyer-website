import { API_URL } from '@/config/api';
import { SafeUser } from '@/types/SafeUser';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';

export async function deleteUser(id: string): Promise<WithId<SafeUser>> {
  const response = await apiFetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  });
  const json = await response.json();
  return json.data;
}
