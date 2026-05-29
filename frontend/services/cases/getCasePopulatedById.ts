import { API_URL } from '@/config/api';
import { MissingRequiredArgumentError } from '@/errors/MissingRequiredArgumentError';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

export async function getCasePopulatedById(
  id: string
): Promise<ActionResponse<WithId<CaseWithRelations>>> {
  if (!id) {
    throw new MissingRequiredArgumentError(getCasePopulatedById.name, 'id');
  }

  const response = await apiFetch(`${API_URL}/cases/${id}?populate=true`);

  return await makeActionResponse(response);
}
