import { API_URL } from '@/config/api';
import { CaseFile } from '@/types/CaseFile';
import { apiFetch } from '../apiFetch';
import { WithId } from '@/types/WithId';
import { Page } from '@/types/Page';

export interface GetFilesParams {
  ownerId: string;
  limit: number;
  page: number;
}

export async function getFiles({
  ownerId,
  limit,
  page,
}: GetFilesParams): Promise<Page<WithId<CaseFile>>> {
  const response = await apiFetch(`${API_URL}/cases/${ownerId}/files?limit=${limit}&page=${page}`);
  const json = await response.json();
  return json.data;
}
