import { InvalidEmailError } from '../../../errors/domain/InvalidEmailError';
import { validateEmail } from './validateEmail';

describe(`Testing ${validateEmail.name}`, () => {
  function getThrownError(callBack: Function) {
    try {
      callBack();
      return null;
    } catch (error) {
      return error;
    }
  }

  test('should not throw error when user email is valid', () => {
    const thrownError1 = getThrownError(() => validateEmail('fulano@email.com'));
    const thrownError2 = getThrownError(() => validateEmail('beltrano22@email.org'));
    const thrownError3 = getThrownError(() => validateEmail('test888@email.com'));
    expect(thrownError1).toBeNull();
    expect(thrownError2).toBeNull();
    expect(thrownError3).toBeNull();
  });

  test('should throw InvalidEmailError if email provided is invalid', () => {
    const thrownError1 = getThrownError(() => validateEmail('jo.com'));
    const thrownError2 = getThrownError(() => validateEmail('vrauzera@email'));
    const thrownError3 = getThrownError(() => validateEmail('teste@.com'));
    const thrownError4 = getThrownError(() => validateEmail(''));
    expect(thrownError1).toBeInstanceOf(InvalidEmailError);
    expect(thrownError2).toBeInstanceOf(InvalidEmailError);
    expect(thrownError3).toBeInstanceOf(InvalidEmailError);
    expect(thrownError4).toBeInstanceOf(InvalidEmailError);
  });
});
