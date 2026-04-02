import { API_URL } from '@/config/api';
import { InvalidAPIResponseError } from '@/errors/InvalidAPIResponseError';
import { MissingRequiredArgumentError } from '@/errors/MissingRequiredArgumentError';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';

export async function getCaseById(id: string): Promise<WithId<CaseWithRelations>> {
  if (!id) {
    throw new MissingRequiredArgumentError(getCaseById.name, 'id');
  }

  const response = await apiFetch(`${API_URL}/cases/${id}`);

  const json = await response.json();

  if (!json?.data) {
    throw new InvalidAPIResponseError('Missing data', json);
  }
  return json.data;
}
