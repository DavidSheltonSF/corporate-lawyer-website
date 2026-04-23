import { InvalidDateError } from '../../errors/domain/InvalidDateError';
import { validateDate } from './validateDate';

describe(`Testing ${validateDate.name}`, () => {
  function getThrownError(callBack: Function) {
    try {
      callBack();
      return null;
    } catch (error) {
      return error;
    }
  }

  test('should not throw error when user date is valid', () => {
    const thrownError1 = getThrownError(() => validateDate('2000-05-15'));
    const thrownError2 = getThrownError(() => validateDate('2026-02-28'));
    const thrownError3 = getThrownError(() => validateDate('1999-10-24'));
    expect(thrownError1).toBeNull();
    expect(thrownError2).toBeNull();
    expect(thrownError3).toBeNull();
  });

  test('should throw InvalidDateError if date provided is invalid', () => {
    const thrownError1 = getThrownError(() => validateDate('2026-02-29'));
    const thrownError2 = getThrownError(() => validateDate('2025-06-38'));
    const thrownError3 = getThrownError(() => validateDate('2025-00-38'));
    const thrownError4 = getThrownError(() => validateDate('teste@.com'));
    const thrownError5 = getThrownError(() => validateDate(''));
    expect(thrownError1).toBeInstanceOf(InvalidDateError);
    expect(thrownError2).toBeInstanceOf(InvalidDateError);
    expect(thrownError3).toBeInstanceOf(InvalidDateError);
    expect(thrownError4).toBeInstanceOf(InvalidDateError);
    expect(thrownError4).toBeInstanceOf(InvalidDateError);
    expect(thrownError5).toBeInstanceOf(InvalidDateError);
  });
});
