import { UserProps } from '@/types/UserProps';
import { fetchUser } from './fetchUser';
import { WithId } from '@/types/WIthId';

export async function fetchLawyers(ids: string[]): Promise<WithId<UserProps>[]> {
  const promises = ids.map((id) => fetchUser(id));

  return Promise.all(promises);
}
