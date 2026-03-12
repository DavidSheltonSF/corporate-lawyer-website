import { InvalidCPFError } from '../../errors/domain/InvalidCPFError';
import { validateCPF } from './validateCPF';

describe(`Testing ${validateCPF.name}`, () => {
  function getThrownError(callBack: Function) {
    try {
      callBack();
      return null;
    } catch (error) {
      return error;
    }
  }

  test('should not throw error when user role is valid', () => {
    const thrownError1 = getThrownError(() => validateCPF('158.555.555-88'));
    const thrownError2 = getThrownError(() => validateCPF('15855555588'));
    const thrownError3 = getThrownError(() => validateCPF('00288544788'));
    expect(thrownError1).toBeNull();
    expect(thrownError2).toBeNull();
    expect(thrownError3).toBeNull();
  });

  test('should throw InvalidRoleError if role provided is invalid', () => {
    const thrownError1 = getThrownError(() => validateCPF('jo.com'));
    const thrownError2 = getThrownError(() => validateCPF('5588844478'));
    const thrownError3 = getThrownError(() => validateCPF('111.558.777.77'));
    const thrownError4 = getThrownError(() => validateCPF(''));
    expect(thrownError1).toBeInstanceOf(InvalidCPFError);
    expect(thrownError2).toBeInstanceOf(InvalidCPFError);
    expect(thrownError3).toBeInstanceOf(InvalidCPFError);
    expect(thrownError4).toBeInstanceOf(InvalidCPFError);
  });
});
