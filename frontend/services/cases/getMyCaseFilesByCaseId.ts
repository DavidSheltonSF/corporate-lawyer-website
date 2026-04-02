import { API_URL } from '@/config/api';
import { CaseFile } from '@/types/CaseFile';
import { apiFetch } from '../apiFetch';

export async function getMyCaseFilesByCaseId(id: string): Promise<CaseFile[]> {
  const response = await apiFetch(`${API_URL}/my/cases/${id}/caseFiles`);
  const json = await response.json();
  return json.data;
}
