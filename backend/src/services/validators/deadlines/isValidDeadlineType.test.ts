import { describe, it } from 'vitest';
import { DeadlineType } from '../../../types/DeadLineType';
import { isValidDeadlineType } from './isValidDeadlineType';

describe(`Testing ${isValidDeadlineType.name}`, () => {
  it('should return true if valid deadline types if provided', () => {
    expect(isValidDeadlineType(DeadlineType.PAGAMENTO)).toBeTruthy();
    expect(isValidDeadlineType(DeadlineType.AUDIENCIA)).toBeTruthy();
    expect(isValidDeadlineType(DeadlineType.CONTESTACAO)).toBeTruthy();
    expect(isValidDeadlineType(DeadlineType.MANIFESTACAO)).toBeTruthy();
    expect(isValidDeadlineType(DeadlineType.OUTRO)).toBeTruthy();
    expect(isValidDeadlineType(DeadlineType.RECURSO)).toBeTruthy();
    expect(isValidDeadlineType(DeadlineType.REPLICA)).toBeTruthy();
  });

  it('should return false if invalidvalid deadline types if provided', () => {
    expect(isValidDeadlineType('banana')).toBeFalsy();
    expect(isValidDeadlineType('')).toBeFalsy();
    expect(isValidDeadlineType('sfdsfasdfa')).toBeFalsy();
  });
});
