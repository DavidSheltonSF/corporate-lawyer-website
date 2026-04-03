import { InvalidProcessNumberError } from "../../../errors/domain/InvalidProcessNumberError";
import { validateProcessNumber } from './validateProcessNumber';

describe(`Testing ${validateProcessNumber.name}`, () => {
  function getThrownError(callBack: Function) {
    try {
      callBack();
      return null;
    } catch (error) {
      return error;
    }
  }

  test('should not throw error when user process number is valid', () => {
    const thrownError1 = getThrownError(() => validateProcessNumber('00012345620248260100'));
    const thrownError2 = getThrownError(() => validateProcessNumber('00888845620248260100'));
    const thrownError3 = getThrownError(() => validateProcessNumber('00012345620248267778'));
    expect(thrownError1).toBeNull();
    expect(thrownError2).toBeNull();
    expect(thrownError3).toBeNull();
  });

  test('should throw InvalidProcessNumberError if process number provided is invalid', () => {
    const thrownError1 = getThrownError(() => validateProcessNumber('0001234562024826010'));
    const thrownError2 = getThrownError(() => validateProcessNumber('000123456202482601D0'));
    const thrownError3 = getThrownError(() => validateProcessNumber('000123456202482601055'));
    const thrownError4 = getThrownError(() => validateProcessNumber(''));
    expect(thrownError1).toBeInstanceOf(InvalidProcessNumberError);
    expect(thrownError2).toBeInstanceOf(InvalidProcessNumberError);
    expect(thrownError3).toBeInstanceOf(InvalidProcessNumberError);
    expect(thrownError4).toBeInstanceOf(InvalidProcessNumberError);
  });
});
