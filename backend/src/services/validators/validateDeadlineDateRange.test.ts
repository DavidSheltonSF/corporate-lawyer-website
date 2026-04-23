import { InvalidDateRangeError } from '../../errors/domain/InvalidDateRangeError';
import { validateDeadlineDateRange } from './validateDeadlineDateRange';

describe(`Testing ${validateDeadlineDateRange.name}`, () => {
  function getThrownError(callBack: Function) {
    try {
      callBack();
      return null;
    } catch (error) {
      return error;
    }
  }

  test('should not throw error when user date is valid', () => {
    const startDate = new Date('2000-05-15');
    const dueDate = new Date('2000-05-20');
    const thrownError = getThrownError(() => validateDeadlineDateRange(startDate, dueDate));
    expect(thrownError).toBeNull();
  });

  test('should throw InvalidDateRangeError if date provided is invalid', () => {
    const startDate = new Date('2000-05-15');
    const dueDate = new Date('2000-05-13');
    const thrownError = getThrownError(() => validateDeadlineDateRange(startDate, dueDate));
    expect(thrownError).toBeInstanceOf(InvalidDateRangeError);
  });
});
