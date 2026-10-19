import { API_URL } from '@/config/api';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

export async function getClientByEmail(email: string): Promise<ActionResponse<WithId<User>>> {
  const response = await apiFetch(`${API_URL}/clients/email/${encodeURIComponent(email)}`);
  return makeActionResponse(response);
}
