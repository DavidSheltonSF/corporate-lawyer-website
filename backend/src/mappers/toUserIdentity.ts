import { UserSlice } from '../types/UserSlice.js';
import { WithId } from '../types/WithId.js';

export function toUserIdentity(userIdentity: any): WithId<UserSlice> {
  return {
    id: userIdentity._id.toString(),
    firstName: userIdentity.firstName,
    lastName: userIdentity.lastName,
  };
}
