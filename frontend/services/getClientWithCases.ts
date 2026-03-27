import { API_URL } from '@/config/api';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';
import { Case } from '@/types/Case';
import { SafeUser } from '@/types/SafeUser';

export async function getClientWithCases(id: string): Promise<SafeUser & { cases: Case[] }> {
  const token = await getTokenFromCookies();

  const response = await fetch(`${API_URL}/clients/${id}?include=cases`, {
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
