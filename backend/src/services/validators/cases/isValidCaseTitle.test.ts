import { describe, expect, it } from 'vitest';
import { isValidCaseTitle } from './isValidCaseTitle.js';

describe(`Test ${isValidCaseTitle}`, () => {
  it('should return true if the case title is valid', () => {
    expect(isValidCaseTitle('Ação de Usucapião Urbano')).toBeTruthy();
    expect(isValidCaseTitle('Ação de Teste e Danos Morais')).toBeTruthy();
  });

  it('should return false if the case title is less than 15 characters', () => {
    expect(isValidCaseTitle('Ano')).toBeFalsy();
    expect(isValidCaseTitle('Ação de Teste')).toBeFalsy();
  });

  it('should return false if the case title is more than 100 characters', () => {
    let bigString = '';
    for (let i = 0; i < 101; i++) {
      bigString += 'a';
    }
    expect(isValidCaseTitle(bigString)).toBeFalsy();
  });
});
