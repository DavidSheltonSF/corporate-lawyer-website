import { describe, expect, it } from 'vitest';
import { isValidCPF } from './isValidCPF.js';

describe(`Testing ${isValidCPF.name}`, () => {
  it('should return true when user CPF is valid', () => {
    expect(isValidCPF('158.555.555-88')).toBe(true);
    expect(isValidCPF('15855555588')).toBe(true);
    expect(isValidCPF('00288544788')).toBe(true);
  });

  it('should return false if cpf provided is invalid', () => {
    expect(isValidCPF('jo.com')).toBe(false);
    expect(isValidCPF('5588844478')).toBe(false);
    expect(isValidCPF('111.558.777.77')).toBe(false);
    expect(isValidCPF('')).toBe(false);
  });
});
