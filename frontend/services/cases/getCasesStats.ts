import { API_URL } from '@/config/api';
import { CasesStats } from '@/types/CasesStats';
import { apiFetch } from '../apiFetch';
import { makeActionResponse } from '@/factories/makeActionResponse';
import { ActionResponse } from '@/types/ActionResponse';

export async function getCasesStats(): Promise<ActionResponse<CasesStats>> {
  const response = await apiFetch(`${API_URL}/cases/stats`);
  return makeActionResponse(response);
}
