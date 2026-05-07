import { API_URL } from '@/config/api';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { Notification } from '@/types/Notification';

export async function getMyNotifications(): Promise<WithId<Notification>[]> {
  const baseRoute = `${API_URL}/my/notifications`;
  const response = await apiFetch(`${baseRoute}`);
  const responseJson = await response.json();
  return responseJson.data;
}
