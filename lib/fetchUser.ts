import { UserProps } from '@/types/UserProps';
import { WithId } from '@/types/WIthId';

export async function fetchUser(id: string): Promise<WithId<UserProps>> {
  try {
    const response = await fetch(`http://localhost:3001/api/users/${id}`);

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
