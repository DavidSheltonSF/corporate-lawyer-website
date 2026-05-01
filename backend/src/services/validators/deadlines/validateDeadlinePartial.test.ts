import { validateDeadlinePartial } from './validateDeadlinePartial';
import { InvalidDeadlineTypeError } from '../../../errors/domain/InvalidDeadlineTypeError';
import { InvalidDeadlinePriorityError } from '../../../errors/domain/InvalidDeadlinePriorityError';
import { InvalidDateError } from '../../../errors/domain/InvalidDateError';
import { getThrownError } from '../../../tests/helpers/getThrownError';
import { DeadlineMocker } from '../../../tests/mocks/entities/DeadlineMocker';

describe(`Testing ${validateDeadlinePartial.name}`, () => {
  test('should not throw error if all deadline fields are  valid', () => {
    const deadlineDTO = DeadlineMocker.mockUpateDeadlineDTO();
    const thrownError = getThrownError(() => validateDeadlinePartial(deadlineDTO));
    expect(thrownError).toBeNull();
  });

  test('should throw InvalidDeadlineTypeError if type provided is invalid', () => {
    const deadlineDTO = DeadlineMocker.mockUpateDeadlineDTO();
    deadlineDTO.type = 'banana';
    const thrownError = getThrownError(() => validateDeadlinePartial(deadlineDTO));
    expect(thrownError).toBeInstanceOf(InvalidDeadlineTypeError);
  });

  test('should throw InvalidDeadlinePriorityError if type provided is invalid', () => {
    const deadlineDTO = DeadlineMocker.mockUpateDeadlineDTO();
    deadlineDTO.priority = 'banana';
    const thrownError = getThrownError(() => validateDeadlinePartial(deadlineDTO));
    expect(thrownError).toBeInstanceOf(InvalidDeadlinePriorityError);
  });

  test('should throw InvalidDateError if the start intimationDate provided is invalid', () => {
    const deadlineDTO = DeadlineMocker.mockUpateDeadlineDTO();
    deadlineDTO.intimationDate = 'banana';
    const thrownError = getThrownError(() => validateDeadlinePartial(deadlineDTO));
    expect(thrownError).toBeInstanceOf(InvalidDateError);
  });
});
