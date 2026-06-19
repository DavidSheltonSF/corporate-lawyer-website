import { apiFetch } from '../apiFetch';

export async function deleteFile(fileId: string): Promise<void> {
  await apiFetch(`/api/files/${fileId}`, {
    method: 'DELETE',
  });
}
