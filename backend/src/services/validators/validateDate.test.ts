import { validateDate } from './validateDate';

describe(`Testing ${validateDate.name}`, () => {
  test('should return true if valid deadline types if provided', () => {
    expect(validateDate('2025-07-05')).toBeTruthy();
    expect(validateDate('2025-02-05')).toBeTruthy();
    expect(validateDate('2024-02-05')).toBeTruthy();
  });

  test('should return false if invalidvalid deadline types if provided', () => {
    expect(validateDate('banana')).toBeFalsy();
    expect(validateDate('')).toBeFalsy();
    expect(validateDate('2025-17-28')).toBeFalsy();
  });
});
