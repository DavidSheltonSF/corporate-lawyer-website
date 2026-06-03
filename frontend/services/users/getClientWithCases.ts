import { API_URL } from '@/config/api';
import { Case } from '@/types/Case';
import { SafeUser } from '@/types/SafeUser';
import { apiFetch } from '../apiFetch';
import { WithId } from '@/types/WithId';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

export async function getClientWithCases(
  id: string
): Promise<ActionResponse<SafeUser & { cases: WithId<Case>[] }>> {
  const response = await apiFetch(`${API_URL}/clients/${id}?include=cases`);
  return makeActionResponse(response);
}
