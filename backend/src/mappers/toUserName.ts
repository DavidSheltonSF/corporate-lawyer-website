import { UserName } from '../types/UserName';
import { WithId } from '../types/WithId';

export function toUserName(userNameDoc: UserName & { _id: any }): WithId<UserName> {
  return {
    id: userNameDoc._id.toString(),
    firstName: userNameDoc.firstName,
    lastName: userNameDoc.lastName,
  };
}
