import { BrazilState } from '../types/BrazilState';
import { City } from '../types/City';
import { HolidaysRecord } from '../types/HolidaysRecord';
import { HolidaysProvider } from './HolidaysProvider';

export const brazilHolidaysRecord: HolidaysRecord = {
  national: [
    '2026-01-01', // Confraternização Universal
    '2026-02-16', // Carnaval (terça)
    '2026-02-17', // Carnaval (quarta parcial / often considered)
    '2026-04-03', // Sexta-feira Santa
    '2026-04-21', // Tiradentes
    '2026-05-01', // Dia do Trabalho
    '2026-06-04', // Corpus Christi
    '2026-09-07', // Independência
    '2026-10-12', // Nossa Senhora Aparecida
    '2026-11-02', // Finados
    '2026-11-15', // Proclamação da República
    '2026-12-25', // Natal
  ],
  states: {
    RIO_DE_JANEIRO: [
      '2026-04-23', // São Jorge
    ],
  },
  cities: {
    BELFORD_ROXO: [
      '2026-04-03', // Aniversário da cidade
    ],
    DUQUE_DE_CAXIAS: [
      '2026-12-31', // Aniversário da cidade
    ],
    RIO_DE_JANEIRO: [
      '2026-01-20', // São Sebastião
    ],
  },
};

export class BrazilHolidaysProvider implements HolidaysProvider {
  getLocalHolidays(state: BrazilState, city: City): string[] {
    return [
      ...brazilHolidaysRecord.national,
      ...brazilHolidaysRecord.states[state],
      ...brazilHolidaysRecord.cities[city],
    ];
  }
}
