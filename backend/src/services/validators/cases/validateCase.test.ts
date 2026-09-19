import { describe, expect, it } from 'vitest';

import { validateCase } from './validateCase.js';
import { ValidationError } from '../../../errors/presentation/ValidationError.js';
import { getThrownError } from '../../../tests/helpers/getThrownError.js';
import { CaseMocker } from '../../../tests/mocks/entities/CaseMoker.js';

describe(`Testing ${validateCase.name}`, () => {
  it('should not throw error if all case fields are valid', () => {
    const caseDTO = CaseMocker.mockCreateCaseDTO();
    const thrownError = getThrownError(() => validateCase(caseDTO));

    expect(thrownError).toBeNull();
  });

  it('should throw ValidationError with the invalid field details', () => {
    const caseDTO = CaseMocker.mockCreateCaseDTO();
    caseDTO.title = 'Ação de Teste';

    const thrownError = getThrownError(() => validateCase(caseDTO));

    expect(thrownError).toBeInstanceOf(ValidationError);
    expect((thrownError as ValidationError).details).toEqual({
      title:
        'Title "Ação de Teste" is invalid. Expected a string with between 15 and 100 characters.',
    });
  });

  it('should aggregate multiple invalid fields', () => {
    const caseDTO = CaseMocker.mockCreateCaseDTO();
    caseDTO.title = 'A';
    caseDTO.caseNumber = 'banana';
    caseDTO.status = 'banana';

    const thrownError = getThrownError(() => validateCase(caseDTO));

    expect(thrownError).toBeInstanceOf(ValidationError);
    expect((thrownError as ValidationError).details).toEqual({
      title: 'Title "A" is invalid. Expected a string with between 15 and 100 characters.',
      caseNumber: "Case number 'banana' is invalid. Expected format: NNNNNNN-DD.AAAA.J.TR.OOOO",
      status: 'Status "banana" is invalid. Expected open,closed',
    });
  });
});
