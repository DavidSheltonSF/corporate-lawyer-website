import { API_URL } from '@/config/api';
import { MissingRequiredArgumentError } from '@/errors/MissingRequiredArgumentError';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

export async function getUserById(id: string): Promise<ActionResponse<WithId<User>>> {
  if (!id) {
    throw new MissingRequiredArgumentError('getUserById', 'id');
  }

  const response = await apiFetch(`${API_URL}/users/${id}`);
  return makeActionResponse(response);
}
