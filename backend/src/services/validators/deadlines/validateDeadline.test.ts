import { describe, it, expect } from 'vitest';

import { validateDeadline } from './validateDeadline.js';
import { getThrownError } from '../../../tests/helpers/getThrownError.js';
import { DeadlineMocker } from '../../../tests/mocks/entities/DeadlineMocker.js';
import { ValidationError } from '../../../errors/presentation/ValidationError.js';

describe(`Testing ${validateDeadline.name}`, () => {
  it('should not throw error if all deadline fields are  valid', () => {
    const deadlineDTO = DeadlineMocker.mockCreateDeadlineDTO();
    const thrownError = getThrownError(() => validateDeadline(deadlineDTO));
    expect(thrownError).toBeNull();
  });

  it('should throw InvalidDeadlineTypeError if type provided is invalid', () => {
    const deadlineDTO = DeadlineMocker.mockCreateDeadlineDTO();
    deadlineDTO.type = 'banana';
    const thrownError = getThrownError(() => validateDeadline(deadlineDTO));
    expect(thrownError).toBeInstanceOf(ValidationError);
  });

  it('should throw InvalidDeadlinePriorityError if type provided is invalid', () => {
    const deadlineDTO = DeadlineMocker.mockCreateDeadlineDTO();
    deadlineDTO.priority = 'banana';
    const thrownError = getThrownError(() => validateDeadline(deadlineDTO));
    expect(thrownError).toBeInstanceOf(ValidationError);
  });

  it('should throw InvalidDateError if the intimationDate provided is invalid', () => {
    const deadlineDTO = DeadlineMocker.mockCreateDeadlineDTO();
    deadlineDTO.intimationDate = 'banana';
    const thrownError = getThrownError(() => validateDeadline(deadlineDTO));
    expect(thrownError).toBeInstanceOf(ValidationError);
  });
});
