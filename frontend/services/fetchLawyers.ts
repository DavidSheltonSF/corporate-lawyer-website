import { WithId } from '@/types/WithId';
import { UserProps } from '@/types/UserProps';
import { fetchUserById } from './fetchUserById';

export async function fetchLawyers(ids: string[]): Promise<WithId<UserProps>[]> {
  const promises = ids.map((id) => fetchUserById(id));

  return Promise.all(promises);
}
