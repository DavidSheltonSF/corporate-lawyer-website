import { API_URL } from '@/config/api';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { ActionResponse } from '@/types/ActionResponse';

export async function getMe(): Promise<ActionResponse<WithId<User | null>>> {
  const response = await apiFetch(`${API_URL}/me`);
  const json = await response.json();

  if (!response.ok) {
    return { success: false, message: json.message, code: json.code };
  }

  return { success: true, data: json.data };
}
