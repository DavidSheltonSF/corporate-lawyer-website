import { API_URL } from '@/config/api';

export async function fetchClientCasesStats(
  clientId: string
): Promise<{ inProgress: number; closed: number }> {
  const response = await fetch(`${API_URL}/client/${clientId}/cases/stats`);

  if (!response.ok) {
    throw Error(await response.text());
  }

  const json = await response.json();

  return json.data;
}
