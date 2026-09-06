import { describe, expect, it } from 'vitest';
import { BrazilState } from '../types/BrazilState';
import { City } from '../types/City';
import { BrazilHolidaysProvider, brazilHolidaysRecord } from './BrazilHolidaysProvider';

describe(`Testing ${BrazilHolidaysProvider.name}`, () => {
  function makeSut() {
    const brazilHolidaysProvider = new BrazilHolidaysProvider();
    return { brazilHolidaysProvider };
  }
  describe('getLocalHolidays', () => {
    it(`should return the Brazilian holidays applicable for the provided state and city`, () => {
      const { brazilHolidaysProvider } = makeSut();

      const state = BrazilState.RIO_DE_JANEIRO;
      const city = City.DUQUE_DE_CAXIAS;
      const holidays = brazilHolidaysProvider.getLocalHolidays(state, city);

      expect(holidays).toEqual([
        ...brazilHolidaysRecord.national,
        ...brazilHolidaysRecord.states[state],
        ...brazilHolidaysRecord.cities[city],
      ]);
    });
  });
});
