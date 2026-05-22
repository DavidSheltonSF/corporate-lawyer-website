import { API_URL } from '@/config/api';
import { CaseFile } from '@/types/CaseFile';
import { apiFetch } from '../apiFetch';
import { WithId } from '@/types/WithId';

export async function getCaseFiles(id: string): Promise<WithId<CaseFile>[]> {
  const response = await apiFetch(`${API_URL}/cases/${id}/files`);
  const json = await response.json();
  return json.data;
}
