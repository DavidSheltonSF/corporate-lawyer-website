import { API_URL } from '@/config/api';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';
import { WithId } from '@/types/WithId';

export async function fetchCaseFiles(
  id: string
): Promise<
  WithId<{ id: string; name: string; url: string; uploadedBy: any; createdAt: string }[]>
> {
  const token = await getTokenFromCookies();

  const response = await fetch(`${API_URL}/client/cases/${id}/caseFiles`, {
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw Error(message);
  }

  const json = await response.json();
  return json.data;
}
