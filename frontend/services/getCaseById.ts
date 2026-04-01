import { API_URL } from '@/config/api';
import { InvalidAPIResponseError } from '@/errors/InvalidAPIResponseError';
import { MissingRequiredArgumentError } from '@/errors/MissingRequiredArgumentError';
import { Case } from '@/types/Case';
import { WithId } from '@/types/WithId';

export async function getCaseById(id: string): Promise<WithId<Case>> {
  if (!id) {
    throw new MissingRequiredArgumentError(getCaseById.name, 'id');
  }

  const response = await fetch(`${API_URL}/cases/${id}`);

  if (!response.ok) {
    throw new Error(await response.text().catch(() => 'Unknown Error'));
  }
  const json = await response.json();

  if (!json?.data) {
    throw new InvalidAPIResponseError('Missing data', json);
  }
  return json.data;
}
