import { API_URL } from '@/config/api';
import { apiFetch } from '../apiFetch';

export async function deleteCaseById(id: string): Promise<void> {
  await apiFetch(`${API_URL}/cases/${id}`, {
    method: 'DELETE',
  });
}
