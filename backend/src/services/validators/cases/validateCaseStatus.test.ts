import { InvalidCaseStatusError } from '../../../errors/domain/InvalidCaseStatusError';
import { getThrownError } from '../../../tests/helpers/getThrownError';
import { validateCaseStatus } from './validateCaseStatus';

describe(`Testing ${validateCaseStatus.name}`, () => {
  test('should not throw error when case status is valid', () => {
    const thrownError1 = getThrownError(() => validateCaseStatus('open'));
    const thrownError2 = getThrownError(() => validateCaseStatus('closed'));
    expect(thrownError1).toBeNull();
    expect(thrownError2).toBeNull();
  });

  test('should throw InvalidCaseStatusError if the case status provided is invalid', () => {
    const thrownError1 = getThrownError(() => validateCaseStatus('banana'));
    const thrownError2 = getThrownError(() => validateCaseStatus('closeddd'));
    const thrownError3 = getThrownError(() => validateCaseStatus(''));
    expect(thrownError1).toBeInstanceOf(InvalidCaseStatusError);
    expect(thrownError2).toBeInstanceOf(InvalidCaseStatusError);
    expect(thrownError3).toBeInstanceOf(InvalidCaseStatusError);
  });
});
