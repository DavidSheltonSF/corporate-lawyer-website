import { API_URL } from '@/config/api';
import { apiFetch } from '../apiFetch';
import { makeActionResponse } from '@/factories/makeActionResponse';
import { ActionResponse } from '@/types/ActionResponse';

export async function deleteCaseById(id: string): Promise<ActionResponse<null>> {
  const response = await apiFetch(`${API_URL}/cases/${id}`, {
    method: 'DELETE',
  });

  return makeActionResponse(response);
}
