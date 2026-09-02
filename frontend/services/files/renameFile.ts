import { apiFetch } from '../apiFetch';
import { API_URL } from '@/config/api';

export interface RenameFileParams {
  fileName: string;
  fileId: string;
}

export async function renameFile(params: RenameFileParams): Promise<void> {
  await apiFetch(`${API_URL}/files/${params.fileId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({
      name: params.fileName,
    }),
  });
}
