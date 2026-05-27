import { API_URL } from '@/config/api';
import { CasesStats } from '@/types/CasesStats';
import { apiFetch } from '../apiFetch';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

export async function getMyCasesStats(): Promise<ActionResponse<CasesStats>> {
  const response = await apiFetch(`${API_URL}/my/cases/stats`);
  return makeActionResponse(response);
}
