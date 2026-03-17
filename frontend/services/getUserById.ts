import { API_URL } from '@/config/api';
import { InvalidAPIResponseError } from '@/errors/InvalidAPIResponseError';
import { MissingRequiredArgumentError } from '@/errors/MissingRequiredArgumentError';
import { User } from '@/types/User';
import { WithId } from '@/types/WithId';

export async function getUserById(id: string): Promise<WithId<User>> {
  if (!id) {
    throw new MissingRequiredArgumentError('getUserById', 'id');
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
}
