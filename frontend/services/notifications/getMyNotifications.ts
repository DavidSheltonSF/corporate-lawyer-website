import { API_URL } from '@/config/api';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { Notification } from '@/types/Notification';
import { Page } from '@/types/Page';

export async function getMyNotifications(page: number, limit: number): Promise<Page<WithId<Notification>>> {
  const baseRoute = `${API_URL}/my/notifications`;
  const response = await apiFetch(`${baseRoute}?page=${page}&limit=${limit}`);
  const responseJson = await response.json();
  return responseJson.data;
}
