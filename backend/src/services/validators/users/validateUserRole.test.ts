import { describe, expect, it } from 'vitest';
import { validateUserRole } from './validateUserRole.js';

describe(`Testing ${validateUserRole.name}`, () => {
  it('should return true when user role is valid', () => {
    expect(validateUserRole('admin')).toBe(true);
    expect(validateUserRole('client')).toBe(true);
    expect(validateUserRole('lawyer')).toBe(true);
  });

  it('should return false if role provided is invalid', () => {
    expect(validateUserRole('banana')).toBe(false);
  });
});
