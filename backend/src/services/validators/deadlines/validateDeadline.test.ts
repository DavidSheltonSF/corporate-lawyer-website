import { validateDeadline } from './validateDeadline';
import { getThrownError } from '../../../tests/helpers/getThrownError';
import { DeadlineMocker } from '../../../tests/mocks/entities/DeadlineMocker';
import { ValidationError } from '../../../errors/presentation/ValidationError';

describe(`Testing ${validateDeadline.name}`, () => {
  test('should not throw error if all deadline fields are  valid', () => {
    const deadlineDTO = DeadlineMocker.mockCreateDeadlineDTO();
    const thrownError = getThrownError(() => validateDeadline(deadlineDTO));
    expect(thrownError).toBeNull();
  });

  test('should throw InvalidDeadlineTypeError if type provided is invalid', () => {
    const deadlineDTO = DeadlineMocker.mockCreateDeadlineDTO();
    deadlineDTO.type = 'banana';
    const thrownError = getThrownError(() => validateDeadline(deadlineDTO));
    expect(thrownError).toBeInstanceOf(ValidationError);
  });

  test('should throw InvalidDeadlinePriorityError if type provided is invalid', () => {
    const deadlineDTO = DeadlineMocker.mockCreateDeadlineDTO();
    deadlineDTO.priority = 'banana';
    const thrownError = getThrownError(() => validateDeadline(deadlineDTO));
    expect(thrownError).toBeInstanceOf(ValidationError);
  });

  test('should throw InvalidDateError if the intimationDate provided is invalid', () => {
    const deadlineDTO = DeadlineMocker.mockCreateDeadlineDTO();
    deadlineDTO.intimationDate = 'banana';
    const thrownError = getThrownError(() => validateDeadline(deadlineDTO));
    expect(thrownError).toBeInstanceOf(ValidationError);
  });
});
