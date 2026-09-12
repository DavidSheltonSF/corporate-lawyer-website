import { describe, expect, it } from 'vitest';
import { validateEmail } from './validateEmail.js';

describe(`Testing ${validateEmail.name}`, () => {
  it('should return true when user email is valid', () => {
    expect(validateEmail('fulano@email.com')).toBe(true);
    expect(validateEmail('beltrano22@email.org')).toBe(true);
    expect(validateEmail('test888@email.com')).toBe(true);
  });

  it('should return false if email provided is invalid', () => {
    expect(validateEmail('jo.com')).toBe(false);
    expect(validateEmail('vrauzera@email')).toBe(false);
    expect(validateEmail('teste@.com')).toBe(false);
    expect(validateEmail('')).toBe(false);
  });
});
