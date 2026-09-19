import { describe, expect, it } from 'vitest';

import { validateCasePartial } from './validateCasePartial.js';
import { ValidationError } from '../../../errors/presentation/ValidationError.js';
import { getThrownError } from '../../../tests/helpers/getThrownError.js';
import { CaseMocker } from '../../../tests/mocks/entities/CaseMoker.js';

describe(`Testing ${validateCasePartial.name}`, () => {
  it('should not throw error when supplied case fields are valid', () => {
    const caseDTO = CaseMocker.mockCreateCaseDTO();
    const thrownError = getThrownError(() => validateCasePartial(caseDTO));

    expect(thrownError).toBeNull();
  });

  it('should ignore omitted case fields', () => {
    const thrownError = getThrownError(() => validateCasePartial({}));

    expect(thrownError).toBeNull();
  });

  it('should throw ValidationError with the invalid field details', () => {
    const thrownError = getThrownError(() => validateCasePartial({ title: 'A' }));

    expect(thrownError).toBeInstanceOf(ValidationError);
    expect((thrownError as ValidationError).details).toEqual({
      title: 'Title "A" is invalid. Expected a string with between 15 and 100 characters.',
    });
  });

  it('should aggregate multiple invalid fields', () => {
    const thrownError = getThrownError(() =>
      validateCasePartial({
        title: 'A',
        caseNumber: 'banana',
        status: 'banana',
      })
    );

    expect(thrownError).toBeInstanceOf(ValidationError);
    expect((thrownError as ValidationError).details).toEqual({
      title: 'Title "A" is invalid. Expected a string with between 15 and 100 characters.',
      caseNumber: "Case number 'banana' is invalid. Expected format: NNNNNNN-DD.AAAA.J.TR.OOOO",
      status: 'Status "banana" is invalid. Expected open,closed',
    });
  });
});
