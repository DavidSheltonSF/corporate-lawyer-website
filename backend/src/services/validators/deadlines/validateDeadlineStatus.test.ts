import { InvalidDeadlineStatusError } from '../../../errors/domain/InvalidDeadlineStatusError';
import { DeadlineStatus } from '../../../types/DeadLineStatus';
import { validateDeadlineStatus } from './validateDeadlineStatus';

describe(`Testing ${validateDeadlineStatus.name}`, () => {
  function getThrownError(callBack: Function) {
    try {
      callBack();
      return null;
    } catch (error) {
      return error;
    }
  }

  test('should not throw error when user CPF is valid', () => {
    const thrownError1 = getThrownError(() => validateDeadlineStatus(DeadlineStatus.PENDENTE));
    const thrownError2 = getThrownError(() => validateDeadlineStatus(DeadlineStatus.EM_ANDAMENTO));
    const thrownError3 = getThrownError(() => validateDeadlineStatus(DeadlineStatus.CONCLUIDO));
    const thrownError4 = getThrownError(() => validateDeadlineStatus(DeadlineStatus.VENCIDO));
    const thrownError5 = getThrownError(() => validateDeadlineStatus(DeadlineStatus.CANCELADO));
    expect(thrownError1).toBeNull();
    expect(thrownError2).toBeNull();
    expect(thrownError3).toBeNull();
    expect(thrownError4).toBeNull();
    expect(thrownError5).toBeNull();
  });

  test('should throw InvalidCPFError if cpf provided is invalid', () => {
    const thrownError1 = getThrownError(() => validateDeadlineStatus('banana'));
    const thrownError2 = getThrownError(() => validateDeadlineStatus('pagamentuuuuu'));
    const thrownError3 = getThrownError(() => validateDeadlineStatus(''));
    expect(thrownError1).toBeInstanceOf(InvalidDeadlineStatusError);
    expect(thrownError2).toBeInstanceOf(InvalidDeadlineStatusError);
    expect(thrownError3).toBeInstanceOf(InvalidDeadlineStatusError);
  });
});
