import { describe, expect, it } from 'vitest';
import { DeadlinePriority } from '../../../types/DeadLinePriority.js';
import { isValidDeadlinePriority } from './isValidDeadlinePriority.js';

describe(`Testing ${isValidDeadlinePriority.name}`, () => {
  it('should return true if valid deadline types if provided', () => {
    expect(isValidDeadlinePriority(DeadlinePriority.ALTA)).toBeTruthy();
    expect(isValidDeadlinePriority(DeadlinePriority.BAIXA)).toBeTruthy();
    expect(isValidDeadlinePriority(DeadlinePriority.MEDIA)).toBeTruthy();
  });

  it('should return false if invalidvalid deadline types if provided', () => {
    expect(isValidDeadlinePriority('banana')).toBeFalsy();
    expect(isValidDeadlinePriority('')).toBeFalsy();
    expect(isValidDeadlinePriority('sfdsfasdfa')).toBeFalsy();
  });
});
