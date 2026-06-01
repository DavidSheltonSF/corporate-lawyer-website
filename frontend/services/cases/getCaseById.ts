import { API_URL } from '@/config/api';
import { MissingRequiredArgumentError } from '@/errors/MissingRequiredArgumentError';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { Case } from '@/types/Case';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

export async function getCaseById(id: string): Promise<ActionResponse<WithId<Case>>> {
  if (!id) {
    throw new MissingRequiredArgumentError(getCaseById.name, 'id');
  }

  const response = await apiFetch(`${API_URL}/cases/${id}`);

  return makeActionResponse(response);
}
