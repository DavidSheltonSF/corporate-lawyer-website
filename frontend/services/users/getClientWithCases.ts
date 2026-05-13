import { API_URL } from '@/config/api';
import { Case } from '@/types/Case';
import { SafeUser } from '@/types/SafeUser';
import { apiFetch } from '../apiFetch';
import { WithId } from '@/types/WithId';

export async function getClientWithCases(
  id: string
): Promise<SafeUser & { cases: WithId<Case>[] }> {
  const response = await apiFetch(`${API_URL}/clients/${id}?include=cases`);
  const json = await response.json();
  return json.data;
}
