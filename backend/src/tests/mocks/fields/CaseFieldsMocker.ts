import casual from 'casual';
import { Types } from 'mongoose';
import { CaseLocation } from '../../../types/CaseLocation';
import { BrazilState } from '../../../types/BrazilState';
import { City } from '../../../types/City';

export class CaseFieldsMocker {
  static mockProcessNumber(): string {
    let processNumber = '';
    for (let i = 0; i < 20; i++) {
      processNumber += casual.integer(0, 9).toString();
    }

    return processNumber;
  }

  static mockCaseTitle(): string {
    return casual.random_element([
      'Ação de Usucapião Urbano',
      'Pedido de indenização por danos morais',
    ]);
  }

  static mockDescription(): string {
    return casual.description;
  }

  static mockLocation(): CaseLocation {
    return {
      state: casual.random_element(Object.keys(BrazilState)),
      city: casual.random_element(Object.keys(City)),
    };
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
