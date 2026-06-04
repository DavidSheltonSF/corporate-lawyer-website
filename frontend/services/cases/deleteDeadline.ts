import { API_URL } from '@/config/api';
import { apiFetch } from '../apiFetch';
import { makeActionResponse } from '@/factories/makeActionResponse';
import { ActionResponse } from '@/types/ActionResponse';
import { WithId } from '@/types/WithId';
import { Deadline } from '@/types/Deadline';

export async function deleteDeadline(id: string): Promise<ActionResponse<WithId<Deadline>>> {
  const response = await apiFetch(`${API_URL}/deadline/${id}`, {
    method: 'DELETE',
  });

  return makeActionResponse(response);
}
