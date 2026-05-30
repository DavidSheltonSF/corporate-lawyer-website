import { DeadlineType } from '../../../types/DeadLineType';
import { isValidDeadlineType } from './isValidDeadlineType';

describe(`Testing ${isValidDeadlineType.name}`, () => {
  test('should return true if valid deadline types if provided', () => {
    expect(isValidDeadlineType(DeadlineType.PAGAMENTO)).toBeTruthy();
    expect(isValidDeadlineType(DeadlineType.AUDIENCIA)).toBeTruthy();
    expect(isValidDeadlineType(DeadlineType.CONTESTACAO)).toBeTruthy();
    expect(isValidDeadlineType(DeadlineType.MANIFESTACAO)).toBeTruthy();
    expect(isValidDeadlineType(DeadlineType.OUTRO)).toBeTruthy();
    expect(isValidDeadlineType(DeadlineType.RECURSO)).toBeTruthy();
    expect(isValidDeadlineType(DeadlineType.REPLICA)).toBeTruthy();
  });

  test('should return false if invalidvalid deadline types if provided', () => {
    expect(isValidDeadlineType('banana')).toBeFalsy();
    expect(isValidDeadlineType('')).toBeFalsy();
    expect(isValidDeadlineType('sfdsfasdfa')).toBeFalsy();
  });
});
