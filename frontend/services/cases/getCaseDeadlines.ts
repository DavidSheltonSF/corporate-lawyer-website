import { API_URL } from '@/config/api';
import { InvalidAPIResponseError } from '@/errors/InvalidAPIResponseError';
import { MissingRequiredArgumentError } from '@/errors/MissingRequiredArgumentError';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { Deadline } from '@/types/Deadline';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

export async function getCaseDeadlines(id: string): Promise<ActionResponse<WithId<Deadline>[]>> {
  if (!id) {
    throw new MissingRequiredArgumentError(getCaseDeadlines.name, 'id');
  }

  const response = await apiFetch(`${API_URL}/cases/${id}/deadlines`);

  return makeActionResponse(response);
}
