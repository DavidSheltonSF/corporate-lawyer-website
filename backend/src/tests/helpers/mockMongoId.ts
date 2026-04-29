import casual from 'casual';
import { Types } from 'mongoose';
export function mockMongoId(): Types.ObjectId {
  return Types.ObjectId.createFromTime(casual.integer(1, 30));
}
