import { API_URL } from '@/frontend/config/api';
import { UserProps } from '@/frontend/types/UserProps';
import { WithId } from '@/frontend/types/WithId';

export async function fetchUserById(id: string): Promise<WithId<UserProps>> {
  try {
    const response = await fetch(`${API_URL}/api/users/${id}`);

    if (!response.ok) {
      throw new Error(await response.text().catch(() => 'Unknown Error'));
    }
    const respJson = await response.json();
    return respJson.data;
  } catch (error) {
    console.log(error);
    throw Error('Could not get user by id');
  }
}
