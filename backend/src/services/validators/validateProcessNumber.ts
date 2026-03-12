import { InvalidProcessNumberError } from '../../errors/domain/InvalidProcessNumberError';

export function validateProcessNumber(processNumber: string) {
  const regex = /^\d{20}$/;
  if (!regex.test(processNumber)) {
    throw new InvalidProcessNumberError(processNumber);
  }
}
