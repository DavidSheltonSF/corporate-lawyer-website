import casual from 'casual';
import { Types } from 'mongoose';

export class GenericMocker {
  static mockInteger(from?: number, to?: number): number {
    return casual.integer(from, to);
  }

  static mockEnum<T>(enumerator: any): T {
    return casual.random_element(Object.keys(enumerator));
  }

  static mockMongoId(): Types.ObjectId {
    return Types.ObjectId.createFromTime(this.mockInteger());
  }
}
