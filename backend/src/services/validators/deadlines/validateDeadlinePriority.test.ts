import { DeadlinePriority } from '../../../types/DeadLinePriority';
import { validateDeadlinePriority } from './validateDeadlinePriority';

describe(`Testing ${validateDeadlinePriority.name}`, () => {
  test('should return true if valid deadline types if provided', () => {
    expect(validateDeadlinePriority(DeadlinePriority.ALTA)).toBeTruthy();
    expect(validateDeadlinePriority(DeadlinePriority.BAIXA)).toBeTruthy();
    expect(validateDeadlinePriority(DeadlinePriority.MEDIA)).toBeTruthy();
  });

  test('should return false if invalidvalid deadline types if provided', () => {
    expect(validateDeadlinePriority('banana')).toBeFalsy();
    expect(validateDeadlinePriority('')).toBeFalsy();
    expect(validateDeadlinePriority('sfdsfasdfa')).toBeFalsy();
  });
});

