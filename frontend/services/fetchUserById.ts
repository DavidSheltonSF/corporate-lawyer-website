import { API_URL } from '@/config/api';
import { InvalidAPIResponseError } from '@/errors/InvalidAPIResponseError';
import { MissingRequiredArgumentError } from '@/errors/MissingRequiredArgumentError';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';

export async function fetchUserById(id: string): Promise<WithId<User>> {
  try {
    if (!id) {
      throw new MissingRequiredArgumentError('fetchUserById', 'id');
    }

    const response = await fetch(`${API_URL}/users/${id}`);

    if (!response.ok) {
      throw new Error(await response.text().catch(() => 'Unknown Error'));
    }
    const json = await response.json();

    if (!json?.data) {
      throw new InvalidAPIResponseError('Missing data', json);
    }
    return json.data;
  } catch (error) {
    console.log(error);
    throw Error('Could not get user by id', { cause: error });
  }
}
