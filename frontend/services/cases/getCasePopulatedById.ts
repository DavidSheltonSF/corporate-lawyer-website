import { API_URL } from '@/config/api';
import { InvalidAPIResponseError } from '@/errors/InvalidAPIResponseError';
import { MissingRequiredArgumentError } from '@/errors/MissingRequiredArgumentError';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { CaseWithRelations } from '@/types/CaseWithRelations';

export async function getCasePopulatedById(id: string): Promise<WithId<CaseWithRelations>> {
  if (!id) {
    throw new MissingRequiredArgumentError(getCasePopulatedById.name, 'id');
  }

  const response = await apiFetch(`${API_URL}/cases/${id}?populate=true`);

  const json = await response.json();

  if (!json?.data) {
    throw new InvalidAPIResponseError('Missing data', json);
  }
  return json.data;
}
