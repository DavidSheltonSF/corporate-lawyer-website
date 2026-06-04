import { API_URL } from '@/config/api';
import { WithId } from '@/types/WithId';
import { apiFetch } from '../apiFetch';
import { Notification } from '@/types/Notification';
import { Page } from '@/types/Page';
import { ActionResponse } from '@/types/ActionResponse';
import { makeActionResponse } from '@/factories/makeActionResponse';

export async function getMyNotifications(
  page: number,
  limit: number
): Promise<ActionResponse<Page<WithId<Notification>>>> {
  const baseRoute = `${API_URL}/my/notifications`;
  const response = await apiFetch(`${baseRoute}?page=${page}&limit=${limit}`);
  return makeActionResponse(response);
}
