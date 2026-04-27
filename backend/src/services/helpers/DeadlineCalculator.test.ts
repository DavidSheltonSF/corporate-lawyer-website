import { BrazilianState } from '../../types/BrazilianState';
import { City } from '../../types/City';
import { createDate } from '../../utils/createDate';
import { BrazilHolidaysProvider } from '../BrazilHolidaysProvider';
import { DeadlineCalculator } from './DeadlineCalculator';

describe(`Testing ${DeadlineCalculator.name}`, () => {
  function makeSut() {
    const brazilHolidaysProvider = new BrazilHolidaysProvider();
    const deadlineCalculator = new DeadlineCalculator(brazilHolidaysProvider);
    return { deadlineCalculator };
  }
  test('should return true if date is weekend and false if it is not', () => {
    const { deadlineCalculator } = makeSut();
    const sundayDate = createDate(2026, 4, 26);
    const mondayDate = createDate(2026, 4, 27);
    const date1 = deadlineCalculator.isWeekend(sundayDate);
    const date2 = deadlineCalculator.isWeekend(mondayDate);
    expect(date1).toBeTruthy();
    expect(date2).toBeFalsy();
  });

  test('should return true if date is a holiday and false if it is not', () => {
    const { deadlineCalculator } = makeSut();

    const holiday1 = createDate(2026, 1, 1);
    const holiday2 = createDate(2026, 2, 16);
    const notHoliday1 = createDate(2026, 4, 26);
    const notHoliday2 = createDate(2026, 4, 27);

    const result1 = deadlineCalculator.isHoliday(
      holiday1,
      BrazilianState.RIO_DE_JANEIRO,
      City.BELFORD_ROXO
    );
    const result2 = deadlineCalculator.isHoliday(
      holiday2,
      BrazilianState.RIO_DE_JANEIRO,
      City.BELFORD_ROXO
    );
    const result3 = deadlineCalculator.isHoliday(
      notHoliday1,
      BrazilianState.RIO_DE_JANEIRO,
      City.BELFORD_ROXO
    );
    const result4 = deadlineCalculator.isHoliday(
      notHoliday2,
      BrazilianState.RIO_DE_JANEIRO,
      City.BELFORD_ROXO
    );
    expect(result1).toBeTruthy();
    expect(result2).toBeTruthy();
    expect(result3).toBeFalsy();
    expect(result4).toBeFalsy();
  });

  test('should return true if date is a isBusinessDay and false if it is not', () => {
    const { deadlineCalculator } = makeSut();

    const weekend = createDate(2026, 4, 26);
    const holiday = createDate(2026, 2, 16);
    const businessDay1 = createDate(2026, 4, 27);
    const businessDay2 = createDate(2026, 4, 28);

    const result1 = deadlineCalculator.isBusinessDay(
      weekend,
      BrazilianState.RIO_DE_JANEIRO,
      City.BELFORD_ROXO
    );
    const result2 = deadlineCalculator.isBusinessDay(
      holiday,
      BrazilianState.RIO_DE_JANEIRO,
      City.BELFORD_ROXO
    );
    const result3 = deadlineCalculator.isBusinessDay(
      businessDay1,
      BrazilianState.RIO_DE_JANEIRO,
      City.BELFORD_ROXO
    );
    const result4 = deadlineCalculator.isBusinessDay(
      businessDay2,
      BrazilianState.RIO_DE_JANEIRO,
      City.BELFORD_ROXO
    );
    expect(result1).toBeFalsy();
    expect(result2).toBeFalsy();
    expect(result3).toBeTruthy();
    expect(result4).toBeTruthy();
  });
});
