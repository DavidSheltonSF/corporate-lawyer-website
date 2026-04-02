import { API_URL } from '@/config/api';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';
import { CasesStats } from '@/types/CasesStats';
import { apiFetch } from '../apiFetch';

export async function getMyCasesStats(): Promise<CasesStats> {
  const token = await getTokenFromCookies();

  const response = await apiFetch(`${API_URL}/my/cases/stats`, {
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  return json.data;
}
