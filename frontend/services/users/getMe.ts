import { API_URL } from '@/config/api';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';

export async function getMe(): Promise<WithId<User>> {
  const response = await apiFetch(`${API_URL}/me`);
  const json = await response.json();
  return json.data;
}
