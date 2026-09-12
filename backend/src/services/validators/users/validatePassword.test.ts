import { describe, expect, it } from 'vitest';
import { validatePassword } from './validatePassword.js';

describe(`Testing ${validatePassword.name}`, () => {
  it('should return true when password is valid', () => {
    expect(validatePassword('Mauro#123')).toBe(true);
    expect(validatePassword('Vigo@123')).toBe(true);
    expect(validatePassword('Tamiriocho123!')).toBe(true);
  });

  it('should return false if password provided is invalid', () => {
    expect(validatePassword('mario010203')).toBe(false);
    expect(validatePassword('Tamiriocho123515160')).toBe(false);
    expect(validatePassword('##Gdagnuenskalgafga')).toBe(false);
    expect(validatePassword('')).toBe(false);
  });
});
