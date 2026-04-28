import { InvalidUserRoleError } from '../../../errors/domain/InvalidUserRoleError';
import { getThrownError } from '../../../tests/helpers/getThrownError';
import { validateUserRole } from './validateUserRole';

describe(`Testing ${validateUserRole.name}`, () => {
  test('should not throw error when user role is valid', () => {
    const thrownError1 = getThrownError(() => validateUserRole('admin'));
    const thrownError2 = getThrownError(() => validateUserRole('client'));
    const thrownError3 = getThrownError(() => validateUserRole('lawyer'));
    expect(thrownError1).toBeNull();
    expect(thrownError2).toBeNull();
    expect(thrownError3).toBeNull();
  });

  test('should throw InvalidRoleError if role provided is invalid', () => {
    const thrownError = getThrownError(() => validateUserRole('banana'));
    expect(thrownError).toBeInstanceOf(InvalidUserRoleError);
  });
});
