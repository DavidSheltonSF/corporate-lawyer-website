import { describe, expect, it } from 'vitest';
import { isValidCaseNumber } from './isValidCaseNumber.js';

describe(`Test ${isValidCaseNumber.name}`, () => {
  it('should return true if the case number is valid', () => {
    //NNNNNNN-DD.AAAA.J.TR.OOOO
    expect(isValidCaseNumber('2555547-22.5858.1.44.1988')).toBeTruthy();
    expect(isValidCaseNumber('25555472258581441988')).toBeTruthy();
  });

  it('should return false if the case number is invalid', () => {
    expect(isValidCaseNumber('165151515115')).toBeFalsy();
    expect(isValidCaseNumber('')).toBeFalsy();
    expect(isValidCaseNumber('safdsafsfdF')).toBeFalsy();
  });
});
