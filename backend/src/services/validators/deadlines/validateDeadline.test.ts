import { validateDeadline } from './validateDeadline';
import { InvalidDeadlineTypeError } from '../../../errors/domain/InvalidDeadlineTypeError';
import { InvalidDeadlinePriorityError } from '../../../errors/domain/InvalidDeadlinePriorityError';
import { InvalidDateError } from '../../../errors/domain/InvalidDateError';
import { mockCreateDeadlineDTO } from '../../../tests/mocks/deadline/mockCreateDeadlineDTO';
import { getThrownError } from '../../../tests/helpers/getThrownError';

describe(`Testing ${validateDeadline.name}`, () => {
  test('should not throw error if all deadline fields are  valid', () => {
    const deadlineDTO = mockCreateDeadlineDTO();
    const thrownError = getThrownError(() => validateDeadline(deadlineDTO));
    expect(thrownError).toBeNull();
  });

  test('should throw InvalidDeadlineTypeError if type provided is invalid', () => {
    const deadlineDTO = mockCreateDeadlineDTO();
    deadlineDTO.type = 'banana';
    const thrownError = getThrownError(() => validateDeadline(deadlineDTO));
    expect(thrownError).toBeInstanceOf(InvalidDeadlineTypeError);
  });

  test('should throw InvalidDeadlinePriorityError if type provided is invalid', () => {
    const deadlineDTO = mockCreateDeadlineDTO();
    deadlineDTO.priority = 'banana';
    const thrownError = getThrownError(() => validateDeadline(deadlineDTO));
    expect(thrownError).toBeInstanceOf(InvalidDeadlinePriorityError);
  });

  test('should throw InvalidDateError if the intimationDate provided is invalid', () => {
    const deadlineDTO = mockCreateDeadlineDTO();
    deadlineDTO.intimationDate = 'banana';
    const thrownError = getThrownError(() => validateDeadline(deadlineDTO));
    expect(thrownError).toBeInstanceOf(InvalidDateError);
  });
});
