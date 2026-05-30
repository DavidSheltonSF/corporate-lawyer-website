import { DeadlineType } from '../../../types/DeadLineType';
import { validateDeadlineType } from './validateDeadlineType';

describe(`Testing ${validateDeadlineType.name}`, () => {
  test('should return true if valid deadline types if provided', () => {
    expect(validateDeadlineType(DeadlineType.PAGAMENTO)).toBeTruthy();
    expect(validateDeadlineType(DeadlineType.AUDIENCIA)).toBeTruthy();
    expect(validateDeadlineType(DeadlineType.CONTESTACAO)).toBeTruthy();
    expect(validateDeadlineType(DeadlineType.MANIFESTACAO)).toBeTruthy();
    expect(validateDeadlineType(DeadlineType.OUTRO)).toBeTruthy();
    expect(validateDeadlineType(DeadlineType.RECURSO)).toBeTruthy();
    expect(validateDeadlineType(DeadlineType.REPLICA)).toBeTruthy();
  });

  test('should return false if invalidvalid deadline types if provided', () => {
    expect(validateDeadlineType('banana')).toBeFalsy();
    expect(validateDeadlineType('')).toBeFalsy();
    expect(validateDeadlineType('sfdsfasdfa')).toBeFalsy();
  });
});
