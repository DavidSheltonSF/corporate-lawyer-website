import casual from 'casual';
import { Types, type ObjectId } from 'mongoose';

export class Mocker {
  static mockName(): string {
    return casual.name;
  }

  static mockInteger(from?: number, to?: number): number {
    return casual.integer(from, to);
  }

  static mockEnum<T>(enumerator: any): string {
    return casual.random_element(Object.keys(enumerator));
  }

  static mockMongoId(): ObjectId {
    return Types.ObjectId.createFromTime(this.mockInteger()).
  }
}
