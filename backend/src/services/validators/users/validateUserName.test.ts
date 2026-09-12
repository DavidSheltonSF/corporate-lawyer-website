import { describe, expect, it } from 'vitest';
import { validateUserName } from './validateUserName.js';

describe(`Testing ${validateUserName.name}`, () => {
  it('should return true if name is valid', () => {
    const result = validateUserName('Gustavo');
    expect(result).toBeTruthy();
  });

  it('should return false if name is less than 3 characters', () => {
    const result = validateUserName('U');
    expect(result).toBeFalsy();
  });

  it('should return false if name is more than 100 characters', () => {
    let bigString = ``;
    for (let i = 0; i < 102; i++) {
      bigString += 'W';
    }
    const result = validateUserName(bigString);
    expect(result).toBeFalsy();
  });

  it('should return false if name has any numeric characters', () => {
    const result = validateUserName('Davi4');
    expect(result).toBeFalsy();
  });

  it('should return false if name has any special characters', () => {
    const result = validateUserName('Davi@');
    expect(result).toBeFalsy();
  });
});
