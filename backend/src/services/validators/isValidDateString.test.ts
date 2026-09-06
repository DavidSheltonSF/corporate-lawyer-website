import { describe, it } from 'vitest';
import { isValidDateString } from './isValidDateString';

describe(`Testing ${isValidDateString.name}`, () => {
  it('should return true if valid deadline types if provided', () => {
    expect(isValidDateString('2025-07-05')).toBeTruthy();
    expect(isValidDateString('2025-02-05')).toBeTruthy();
    expect(isValidDateString('2024-02-05')).toBeTruthy();
  });

  it('should return false if invalidvalid deadline types if provided', () => {
    expect(isValidDateString('banana')).toBeFalsy();
    expect(isValidDateString('')).toBeFalsy();
    expect(isValidDateString('2025-17-28')).toBeFalsy();
  });
});
