import { InvalidDeadlinePriorityError } from '../../../errors/domain/InvalidDeadlinePriorityError';
import { DeadlinePriority } from '../../../types/DeadLinePriority';
import { validateDeadlinePriority } from './validateDeadlinePriority';

describe(`Testing ${validateDeadlinePriority.name}`, () => {
  function getThrownError(callBack: Function) {
    try {
      callBack();
      return null;
    } catch (error) {
      return error;
    }
  }

  test('should not throw error when user CPF is valid', () => {
    const thrownError1 = getThrownError(() => validateDeadlinePriority(DeadlinePriority.ALTA));
    const thrownError2 = getThrownError(() => validateDeadlinePriority(DeadlinePriority.MEDIA));
    const thrownError3 = getThrownError(() => validateDeadlinePriority(DeadlinePriority.BAIXA));

    expect(thrownError1).toBeNull();
    expect(thrownError2).toBeNull();
    expect(thrownError3).toBeNull();
  });

  test('should throw InvalidCPFError if cpf provided is invalid', () => {
    const thrownError1 = getThrownError(() => validateDeadlinePriority('banana'));
    const thrownError2 = getThrownError(() => validateDeadlinePriority('pagamentuuuuu'));
    const thrownError3 = getThrownError(() => validateDeadlinePriority(''));
    expect(thrownError1).toBeInstanceOf(InvalidDeadlinePriorityError);
    expect(thrownError2).toBeInstanceOf(InvalidDeadlinePriorityError);
    expect(thrownError3).toBeInstanceOf(InvalidDeadlinePriorityError);
  });
});
