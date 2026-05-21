import { API_URL } from '@/config/api';
import { InvalidAPIResponseError } from '@/errors/InvalidAPIResponseError';
import { MissingRequiredArgumentError } from '@/errors/MissingRequiredArgumentError';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { Deadline } from '@/types/Deadline';

export async function getCaseDeadlines(id: string): Promise<WithId<Deadline>[]> {
  if (!id) {
    throw new MissingRequiredArgumentError(getCaseDeadlines.name, 'id');
  }

  const response = await apiFetch(`${API_URL}/cases/${id}/deadlines`);

  const json = await response.json();

  if (!json?.data) {
    throw new InvalidAPIResponseError('Missing data', json);
  }
  return json.data;
}
