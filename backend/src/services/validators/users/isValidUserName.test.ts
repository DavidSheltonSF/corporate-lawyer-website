import { describe, expect, it } from 'vitest';
import { isValidUserName } from './isValidUserName.js';

describe(`Testing ${isValidUserName.name}`, () => {
  it('should return true if name is valid', () => {
    const result = isValidUserName('Gustavo');
    expect(result).toBeTruthy();
  });

  it('should return false if name is less than 3 characters', () => {
    const result = isValidUserName('U');
    expect(result).toBeFalsy();
  });

  it('should return false if name is more than 100 characters', () => {
    let bigString = ``;
    for (let i = 0; i < 102; i++) {
      bigString += 'W';
    }
    const result = isValidUserName(bigString);
    expect(result).toBeFalsy();
  });

  it('should return false if name has any numeric characters', () => {
    const result = isValidUserName('Davi4');
    expect(result).toBeFalsy();
  });

  it('should return false if name has any special characters', () => {
    const result = isValidUserName('Davi@');
    expect(result).toBeFalsy();
  });
});
