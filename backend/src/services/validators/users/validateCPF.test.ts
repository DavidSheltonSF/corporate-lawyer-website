import { describe, expect, it } from 'vitest';
import { validateCPF } from './validateCPF.js';

describe(`Testing ${validateCPF.name}`, () => {
  it('should return true when user CPF is valid', () => {
    expect(validateCPF('158.555.555-88')).toBe(true);
    expect(validateCPF('15855555588')).toBe(true);
    expect(validateCPF('00288544788')).toBe(true);
  });

  it('should return false if cpf provided is invalid', () => {
    expect(validateCPF('jo.com')).toBe(false);
    expect(validateCPF('5588844478')).toBe(false);
    expect(validateCPF('111.558.777.77')).toBe(false);
    expect(validateCPF('')).toBe(false);
  });
});
