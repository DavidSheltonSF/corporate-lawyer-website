import { UserIdentity } from '../types/UserIdentity';
import { WithId } from '../types/WithId';
import { UserIdentityPersistence } from './User/UserIdentityPersistence';

export function toUserIdentity(userIdentity: UserIdentityPersistence): WithId<UserIdentity> {
  return {
    id: userIdentity._id.toString(),
    firstName: userIdentity.firstName,
    lastName: userIdentity.lastName,
  };
}
