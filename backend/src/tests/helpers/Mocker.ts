import casual from 'casual';
import { Types } from 'mongoose';

export class Mocker {
  static mockName(): string {
    return casual.first_name;
  }

  static mockEmail(): string {
    return casual.email;
  }

  static mockCpf(): string {
    return casual.random_element(['15855855577', '225.558.115-55']);
  }

  static mockPassword(): string {
    return casual.random_element(['Ja#32588', 'vRUIA@24949446S4466SSSFAGA']);
  }

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
