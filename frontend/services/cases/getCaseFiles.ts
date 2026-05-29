import { API_URL } from '@/config/api';
import { CaseFile } from '@/types/CaseFile';
import { apiFetch } from '../apiFetch';
import { WithId } from '@/types/WithId';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

export async function getCaseFiles(id: string): Promise<ActionResponse<WithId<CaseFile>[]>> {
  const response = await apiFetch(`${API_URL}/cases/${id}/files`);
  return makeActionResponse(response);
}
