import { describe, expect, it } from 'vitest';
import { ValidationError } from '../../../errors/presentation/ValidationError.js';
import { getThrownError } from '../../../tests/helpers/getThrownError.js';
import { validateUserPartial } from './validateUserPartial.js';

describe(`Testing ${validateUserPartial.name}`, () => {
  it('should not throw error when supplied user fields are valid', () => {
    const thrownError = getThrownError(() =>
      validateUserPartial({
        firstName: 'Maria',
        lastName: 'Silva',
        email: 'maria@email.com',
        cpf: '158.555.555-88',
        password: 'Mauro#123',
        role: 'client',
      })
    );

    expect(thrownError).toBeNull();
  });

  it('should ignore omitted user fields', () => {
    const thrownError = getThrownError(() => validateUserPartial({}));

    expect(thrownError).toBeNull();
  });

  it('should throw ValidationError with the invalid field details', () => {
    const thrownError = getThrownError(() => validateUserPartial({ email: 'invalid-email' }));

    expect(thrownError).toBeInstanceOf(ValidationError);
    expect((thrownError as ValidationError).details).toEqual({
      email: "Email 'invalid-email' is invalid. Expected format: example@email.com",
    });
  });

  it('should aggregate multiple invalid fields', () => {
    const thrownError = getThrownError(() =>
      validateUserPartial({ firstName: 'A', role: 'banana' })
    );

    expect(thrownError).toBeInstanceOf(ValidationError);
    expect((thrownError as ValidationError).details).toEqual({
      firstName:
        "Invalid name 'A'. Names must contain only letters, hyphens, or apostrophes and be between 2 and 100 characters.",
      role: "Role 'banana' is invalid. User role should be client, lawyer or admin",
    });
  });
});
