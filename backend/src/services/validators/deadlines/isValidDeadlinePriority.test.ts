import { DeadlinePriority } from '../../../types/DeadLinePriority';
import { isValidDeadlinePriority } from './isValidDeadlinePriority';

describe(`Testing ${isValidDeadlinePriority.name}`, () => {
  test('should return true if valid deadline types if provided', () => {
    expect(isValidDeadlinePriority(DeadlinePriority.ALTA)).toBeTruthy();
    expect(isValidDeadlinePriority(DeadlinePriority.BAIXA)).toBeTruthy();
    expect(isValidDeadlinePriority(DeadlinePriority.MEDIA)).toBeTruthy();
  });

  test('should return false if invalidvalid deadline types if provided', () => {
    expect(isValidDeadlinePriority('banana')).toBeFalsy();
    expect(isValidDeadlinePriority('')).toBeFalsy();
    expect(isValidDeadlinePriority('sfdsfasdfa')).toBeFalsy();
  });
});
