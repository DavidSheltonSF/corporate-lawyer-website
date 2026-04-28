import { InvalidNameError } from '../../../errors/domain/InvalidNameError';
import { validateUserName } from './validateUserName';

describe(`Testing ${validateUserName.name}`, () => {
  function getThrownError(callBack: Function) {
    try {
      callBack();
      return null;
    } catch (error) {
      return error;
    }
  }

  test('should not throw error when name is valid', () => {
    const thrownError = getThrownError(() => validateUserName('Gustavo'));
    expect(thrownError).toBeNull();
  });

  test('should throw error when name is less than 3 characters', () => {
    const thrownError = getThrownError(() => validateUserName('U'));
    expect(thrownError).toBeInstanceOf(InvalidNameError);
  });

  test('should throw error when name is more than 100 characters', () => {
    let bigString = ``;
    for (let i = 0; i < 102; i++) {
      bigString += 'W';
    }
    const thrownError = getThrownError(() => validateUserName(bigString));
    expect(thrownError).toBeInstanceOf(InvalidNameError);
  });

  test('should throw error when name has any numeric characters', () => {
    const thrownError = getThrownError(() => validateUserName('Davi4'));
    expect(thrownError).toBeInstanceOf(InvalidNameError);
  });

  test('should throw error when name has any special characters', () => {
    const thrownError = getThrownError(() => validateUserName('Davi#'));
    expect(thrownError).toBeInstanceOf(InvalidNameError);
  });
});
