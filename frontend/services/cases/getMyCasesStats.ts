import { API_URL } from '@/config/api';
import { CasesStats } from '@/types/CasesStats';
import { apiFetch } from '../apiFetch';

export async function getMyCasesStats(): Promise<CasesStats> {
  const response = await apiFetch(`${API_URL}/my/cases/stats`);
  const json = await response.json();
  return json.data;
}
