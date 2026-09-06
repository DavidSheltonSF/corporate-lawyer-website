import { describe, expect, it } from 'vitest';
import { DeadlineCountingType } from '../../../types/DeadlineCountingType';
import { isValidDeadlineCountingType } from './isValidDeadlineCountingType';

describe(`Testing ${isValidDeadlineCountingType.name}`, () => {
  it('should return true if valid deadline countingtypes if provided', () => {
    expect(isValidDeadlineCountingType(DeadlineCountingType.DIAS_CORRIDOS)).toBeTruthy();
    expect(isValidDeadlineCountingType(DeadlineCountingType.DIAS_UTEIS)).toBeTruthy();
  });

  it('should return false if invalidvalid deadline countingtypes if provided', () => {
    expect(isValidDeadlineCountingType('banana')).toBeFalsy();
    expect(isValidDeadlineCountingType('')).toBeFalsy();
    expect(isValidDeadlineCountingType('sfdsfasdfa')).toBeFalsy();
  });
});
