import { BrazilianState } from '../types/BrazilianState';
import { City } from '../types/City';
import { HolidaysRecord } from '../types/HolidaysRecord';
import { HolidaysProvider } from './HolidaysProvider';

export const brazilHolidaysRecord: HolidaysRecord = {
  national: ['brazil1', 'brazil2'],
  states: {
    RIO_DE_JANEIRO: ['rj1', 'rj2', 'rj3'],
  },
  cities: {
    BELFORD_ROXO: ['belford1'],
    DUQUE_DE_CAXIAS: ['duque1', 'duque2', 'duque3'],
    RIO_DE_JANEIRO: ['rjCidade1', 'rjCidade2'],
  },
};

export class BrazilHolidaysProvider implements HolidaysProvider {
  getLocalHolidays(state: BrazilianState, city: City): string[] {
    return [
      ...brazilHolidaysRecord.national,
      ...brazilHolidaysRecord.states[state],
      ...brazilHolidaysRecord.cities[city],
    ];
  }
}
