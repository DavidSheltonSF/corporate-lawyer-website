import { API_URL } from '@/config/api';
import { InvalidAPIResponse } from '@/errors/InvalidAPIResponse';
import { UserProps } from '@/types/UserProps';
import { WithId } from '@/types/WithId';

export async function fetchUserById(id: string): Promise<WithId<UserProps>> {
  try {
    const response = await fetch(`${API_URL}/api/users/${id}`);

    if (!response.ok) {
      throw new Error(await response.text().catch(() => 'Unknown Error'));
    }
    const json = await response.json();

    if (!json?.data) {
      throw new InvalidAPIResponse('Missing data', json);
    }
    return json.data;
  } catch (error) {
    console.log(error);
    throw Error('Could not get user by id', { cause: error });
  }
}
