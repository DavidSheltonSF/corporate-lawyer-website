import { UserSlice } from '../types/UserSlice';
import { WithId } from '../types/WithId';

export function toUserIdentity(userIdentity: any): WithId<UserSlice> {
  return {
    id: userIdentity._id.toString(),
    firstName: userIdentity.firstName,
    lastName: userIdentity.lastName,
  };
}
