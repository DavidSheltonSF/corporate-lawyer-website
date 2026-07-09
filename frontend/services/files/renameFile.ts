import { CaseFile } from '@/types/CaseFile';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { API_URL } from '@/config/api';

interface RenameFileParams {
  fileName: string;
  fileId: string;
}

export async function renameFile(params: RenameFileParams): Promise<WithId<CaseFile>> {
  const response = await apiFetch(`${API_URL}/files/${params.fileId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({
      name: params.fileName,
    }),
  });

  return response.json()
}
