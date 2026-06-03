import { API_URL } from '@/config/api';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

export async function getMe(): Promise<ActionResponse<WithId<User>>> {
  const response = await apiFetch(`${API_URL}/me`);
  return makeActionResponse(response);
}
