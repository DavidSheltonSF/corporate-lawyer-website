import { describe, expect, it } from 'vitest';
import { isValidCaseStatus } from './isValidCaseStatus.js';
import { CasesStatus } from '../../../types/CasesStatus.js';

describe(`Test ${isValidCaseStatus}`, () => {
  it('should return true if the case status is valid', () => {
    expect(isValidCaseStatus(CasesStatus.closed)).toBeTruthy();
    expect(isValidCaseStatus(CasesStatus.open)).toBeTruthy();
  });

  it('should return false if the case status is invalid', () => {
    expect(isValidCaseStatus('banana')).toBeFalsy();
    expect(isValidCaseStatus('cnfiasnfdsanpx')).toBeFalsy();
  });
});
