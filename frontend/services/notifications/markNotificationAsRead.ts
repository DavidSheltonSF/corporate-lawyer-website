import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { Notification } from '@/types/Notification';

export async function markNotificationAsRead(id: string): Promise<WithId<Notification>> {
  const response = await apiFetch(`/api/notifications/${id}/read`, {
    method: 'PUT',
  });
  const responseJson = await response.json();
  return responseJson.data;
}
