import { describe, expect, it } from 'vitest';
import { isValidEmail } from './isValidEmail.js';

describe(`Testing ${isValidEmail.name}`, () => {
  it('should return true when user email is valid', () => {
    expect(isValidEmail('fulano@email.com')).toBe(true);
    expect(isValidEmail('beltrano22@email.org')).toBe(true);
    expect(isValidEmail('test888@email.com')).toBe(true);
  });

  it('should return false if email provided is invalid', () => {
    expect(isValidEmail('jo.com')).toBe(false);
    expect(isValidEmail('vrauzera@email')).toBe(false);
    expect(isValidEmail('teste@.com')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});
