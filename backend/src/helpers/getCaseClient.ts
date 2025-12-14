import { fakeUserDatabase } from '../fakeDatabase/users';
import { LawyerBasicInfo } from '../types/LawyerBasicInfo';
import { WithId } from '../types/WithId';

export function getCaseClient(clientId: string): WithId<LawyerBasicInfo> | null {
  const client = fakeUserDatabase.find((user) => user.id === clientId);

  if (!client) return null;

  return client;
}
