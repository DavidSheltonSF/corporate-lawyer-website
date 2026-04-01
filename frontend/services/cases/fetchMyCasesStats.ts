import { API_URL } from '@/config/api';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';
import { CasesStats } from '@/types/CasesStats';

export async function fetchMyCasesStats(): Promise<CasesStats> {
  const token = await getTokenFromCookies();

  const response = await fetch(`${API_URL}/my/cases/stats`, {
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw Error(await response.text());
  }

  const json = await response.json();

  return json.data;
}
