import { UserIdentity } from '../types/UserIdentity';
import { WithId } from '../types/WithId';

export function toUserIdentity(userIdentity: any): WithId<UserIdentity> {
  return {
    id: userIdentity._id.toString(),
    firstName: userIdentity.firstName,
    lastName: userIdentity.lastName,
  };
}
