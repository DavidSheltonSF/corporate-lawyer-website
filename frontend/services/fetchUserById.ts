import { InvalidAPIResponseError } from '@/errors/InvalidAPIResponseError';
import { MissingRequiredArgumentError } from '@/errors/MissingRequiredArgumentError';
import { UserProps } from '@/types/UserProps';
import { WithId } from '@/types/WithId';

export async function fetchUserById(id: string): Promise<WithId<UserProps>> {
  try {
    if (!id) {
      throw new MissingRequiredArgumentError('fetchUserById', 'id');
    }

    const response = await fetch(`/api/users/${id}`);

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
