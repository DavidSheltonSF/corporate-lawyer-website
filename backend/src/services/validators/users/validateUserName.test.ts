import { describe, it } from 'vitest';
import { InvalidNameError } from '../../../errors/domain/InvalidNameError';
import { getThrownError } from '../../../tests/helpers/getThrownError';
import { validateUserName } from './validateUserName';

describe(`Testing ${validateUserName.name}`, () => {
  it('should not throw error when name is valid', () => {
    const thrownError = getThrownError(() => validateUserName('Gustavo'));
    expect(thrownError).toBeNull();
  });

  it('should throw error when name is less than 3 characters', () => {
    const thrownError = getThrownError(() => validateUserName('U'));
    expect(thrownError).toBeInstanceOf(InvalidNameError);
  });

  it('should throw error when name is more than 100 characters', () => {
    let bigString = ``;
    for (let i = 0; i < 102; i++) {
      bigString += 'W';
    }
    const thrownError = getThrownError(() => validateUserName(bigString));
    expect(thrownError).toBeInstanceOf(InvalidNameError);
  });

  it('should throw error when name has any numeric characters', () => {
    const thrownError = getThrownError(() => validateUserName('Davi4'));
    expect(thrownError).toBeInstanceOf(InvalidNameError);
  });

  it('should throw error when name has any special characters', () => {
    const thrownError = getThrownError(() => validateUserName('Davi#'));
    expect(thrownError).toBeInstanceOf(InvalidNameError);
  });
});
