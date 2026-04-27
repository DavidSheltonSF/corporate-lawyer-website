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
});
