import { API_URL } from '@/config/api';
import { apiFetch } from '../apiFetch';
import { makeActionResponse } from '@/factories/makeActionResponse';
import { ActionResponse } from '@/types/ActionResponse';
import { makeEmptyActionResponse } from '@/factories/makeEmptyActionResponse';

export async function deleteCaseById(id: string): Promise<ActionResponse<null>> {
  const response = await apiFetch(`${API_URL}/cases/${id}`, {
    method: 'DELETE',
  });

  return makeEmptyActionResponse(response);
}
