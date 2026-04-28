import { simpleFaker } from '@faker-js/faker';
import { Types } from 'mongoose';

export function mockMongoId(): Types.ObjectId {
  return Types.ObjectId.createFromTime(simpleFaker.number.int());
}
