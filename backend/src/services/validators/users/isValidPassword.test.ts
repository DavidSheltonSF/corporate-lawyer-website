import { describe, expect, it } from 'vitest';
import { isValidPassword } from './isValidPassword.js';

describe(`Testing ${isValidPassword.name}`, () => {
  it('should return true when password is valid', () => {
    expect(isValidPassword('Mauro#123')).toBe(true);
    expect(isValidPassword('Vigo@123')).toBe(true);
    expect(isValidPassword('Tamiriocho123!')).toBe(true);
  });

  it('should return false if password provided is invalid', () => {
    expect(isValidPassword('mario010203')).toBe(false);
    expect(isValidPassword('Tamiriocho123515160')).toBe(false);
    expect(isValidPassword('##Gdagnuenskalgafga')).toBe(false);
    expect(isValidPassword('')).toBe(false);
  });
});
