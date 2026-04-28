import { InvalidPasswordError } from "../../../errors/domain/InvalidPasswordError";
import { getThrownError } from "../../../tests/helpers/getThrownError";
import { validatePassword } from './validatePassword';

describe(`Testing ${validatePassword.name}`, () => {
  test('should not throw error when password is valid', () => {
    const thrownError1 = getThrownError(() => validatePassword('Mauro#123'));
    const thrownError2 = getThrownError(() => validatePassword('Vigo@123'));
    const thrownError3 = getThrownError(() => validatePassword('Tamiriocho123!'));
    expect(thrownError1).toBeNull();
    expect(thrownError2).toBeNull();
    expect(thrownError3).toBeNull();
  });

  test('should throw InvalidPasswordError if role provided is invalid', () => {
    const thrownError1 = getThrownError(() => validatePassword('mario010203'));
    const thrownError2 = getThrownError(() => validatePassword('Tamiriocho123515160'));
    const thrownError3 = getThrownError(() => validatePassword('##Gdagnuenskalgafga'));
    const thrownError4 = getThrownError(() => validatePassword(''));
    expect(thrownError1).toBeInstanceOf(InvalidPasswordError);
    expect(thrownError2).toBeInstanceOf(InvalidPasswordError);
    expect(thrownError3).toBeInstanceOf(InvalidPasswordError);
    expect(thrownError4).toBeInstanceOf(InvalidPasswordError);
  });
});
