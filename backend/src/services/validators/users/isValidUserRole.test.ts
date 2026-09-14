import { describe, expect, it } from 'vitest';
import { isValidUserRole } from './isValidUserRole.js';

describe(`Testing ${isValidUserRole.name}`, () => {
  it('should return true when user role is valid', () => {
    expect(isValidUserRole('admin')).toBe(true);
    expect(isValidUserRole('client')).toBe(true);
    expect(isValidUserRole('lawyer')).toBe(true);
  });

  it('should return false if role provided is invalid', () => {
    expect(isValidUserRole('banana')).toBe(false);
  });
});
