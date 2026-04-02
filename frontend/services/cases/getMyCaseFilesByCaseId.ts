import { API_URL } from '@/config/api';
import { getTokenFromCookies } from '@/lib/getTokenFromCookies';
import { CaseFile } from '@/types/CaseFile';
import { apiFetch } from '../apiFetch';

export async function getMyCaseFilesByCaseId(id: string): Promise<CaseFile[]> {
  const token = await getTokenFromCookies();

  const response = await apiFetch(`${API_URL}/my/cases/${id}/caseFiles`, {
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  return json.data;
}
