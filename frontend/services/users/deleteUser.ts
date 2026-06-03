import { API_URL } from '@/config/api';
import { SafeUser } from '@/types/SafeUser';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { makeActionResponse } from '@/factories/makeActionResponse';
import { ActionResponse } from '@/types/ActionResponse';

export async function deleteUser(id: string): Promise<ActionResponse<WithId<SafeUser>>> {
  const response = await apiFetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  });
  return makeActionResponse(response);
}
