import { CaseFile } from '@/types/CaseFile';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { API_URL } from '@/config/api';

export async function renameFile(id: string, name: string): Promise<WithId<CaseFile>> {
  const response = await apiFetch(`${API_URL}/files/:id`, { method: 'PATCH' , body: {
    name,
  }});

  return response.json()
}
