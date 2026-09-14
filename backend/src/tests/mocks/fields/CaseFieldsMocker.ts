import casual from 'casual';
import { Types } from 'mongoose';
import { CaseLocation } from '../../../types/CaseLocation.js';
import { BrazilState } from '../../../types/BrazilState.js';
import { City } from '../../../types/City.js';

export class CaseFieldsMocker {
  static mockCaseNumber(): string {
    let caseNumber = '';
    for (let i = 0; i < 20; i++) {
      caseNumber += casual.integer(0, 9).toString();
    }

    return caseNumber;
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
