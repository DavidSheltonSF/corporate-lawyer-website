import { API_URL } from '@/config/api';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';
import { CaseFile } from '@/types/CaseFile';

export async function fetchCaseFiles(id: string): Promise<CaseFile[]> {
  const token = await getTokenFromCookies();

  const response = await fetch(`${API_URL}/client/cases/:${id}/caseFiles`, {
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw Error(error);
  }

  const json = await response.json();

  return json.data;
}
