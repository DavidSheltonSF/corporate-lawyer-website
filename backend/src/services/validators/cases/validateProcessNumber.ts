import { InvalidProcessNumberError } from '../../../errors/domain/InvalidProcessNumberError';

export function validateProcessNumber(processNumber: string) {
  //NNNNNNN-DD.AAAA.J.TR.OOOO
  const regex = /^\d{7}-?\d{2}\.?\d{4}\.?\d{1}\.?\d{2}\.?\d{4}$/;
  if (!regex.test(processNumber)) {
    throw new InvalidProcessNumberError(processNumber);
  }
}
