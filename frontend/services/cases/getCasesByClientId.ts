import { API_URL } from '@/config/api';
import { CaseWithRelations } from '@/types/CaseWithRelations';
import { Page } from '@/types/Page';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

export async function getCasesByClientId(
  id: string,
  populate?: string[]
): Promise<ActionResponse<Page<WithId<CaseWithRelations>>>> {
  const baseRoute = `${API_URL}/client/${id}/cases?populate=${populate || ''}`;

  const response = await apiFetch(`${baseRoute}`);
  return makeActionResponse(response);
}
