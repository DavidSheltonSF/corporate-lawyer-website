import { BrazilState } from '../types/BrazilState';
import { City } from '../types/City';
import { BrazilHolidaysProvider } from './BrazilHolidaysProvider';

describe(`Testing ${BrazilHolidaysProvider.name}`, () => {
  function makeSut() {
    const brazilHolidaysProvider = new BrazilHolidaysProvider();
    return { brazilHolidaysProvider };
  }
  test(`should return Belford Roxo's holidays, Rio de Janeiro's (STATE) Holidays and Brazil's holidays`, () => {
    const { brazilHolidaysProvider } = makeSut();

    const holidays = brazilHolidaysProvider.getLocalHolidays(
      BrazilState.RIO_DE_JANEIRO,
      City.RIO_DE_JANEIRO
    );
    console.log(holidays);
  });
});
