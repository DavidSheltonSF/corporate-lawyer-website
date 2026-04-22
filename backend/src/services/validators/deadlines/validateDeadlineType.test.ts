import { InvalidDeadlineTypeError } from '../../../errors/domain/InvalidDeadlineTypeError';
import { DeadlineType } from '../../../types/DeadLineType';
import { validateDeadlineType } from './validateDeadlineType';

describe(`Testing ${validateDeadlineType.name}`, () => {
  function getThrownError(callBack: Function) {
    try {
      callBack();
      return null;
    } catch (error) {
      return error;
    }
  }

  test('should not throw error when user CPF is valid', () => {
    const thrownError1 = getThrownError(() => validateDeadlineType(DeadlineType.PAGAMENTO));
    const thrownError2 = getThrownError(() => validateDeadlineType(DeadlineType.AUDIENCIA));
    const thrownError3 = getThrownError(() => validateDeadlineType(DeadlineType.CONTESTACAO));
    const thrownError4 = getThrownError(() => validateDeadlineType(DeadlineType.MANIFESTACAO));
    const thrownError5 = getThrownError(() => validateDeadlineType(DeadlineType.OUTRO));
    const thrownError6 = getThrownError(() => validateDeadlineType(DeadlineType.RECURSO));
    const thrownError7 = getThrownError(() => validateDeadlineType(DeadlineType.REPLICA));
    expect(thrownError1).toBeNull();
    expect(thrownError2).toBeNull();
    expect(thrownError3).toBeNull();
    expect(thrownError4).toBeNull();
    expect(thrownError5).toBeNull();
    expect(thrownError6).toBeNull();
    expect(thrownError7).toBeNull();
  });

  test('should throw InvalidCPFError if cpf provided is invalid', () => {
    const thrownError1 = getThrownError(() => validateDeadlineType('banana'));
    const thrownError2 = getThrownError(() => validateDeadlineType('pagamentuuuuu'));
    const thrownError3 = getThrownError(() => validateDeadlineType(''));
    expect(thrownError1).toBeInstanceOf(InvalidDeadlineTypeError);
    expect(thrownError2).toBeInstanceOf(InvalidDeadlineTypeError);
    expect(thrownError3).toBeInstanceOf(InvalidDeadlineTypeError);
  });
});
