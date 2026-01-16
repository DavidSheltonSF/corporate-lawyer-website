import { API_URL } from '@/config/api';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';

export async function fetchClientCasesStats(): Promise<{ inProgress: number; closed: number }> {
  const token = await getTokenFromCookies();

  const response = await fetch(`${API_URL}/client/cases/stats`, {
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
