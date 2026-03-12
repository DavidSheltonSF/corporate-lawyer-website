import { InvalidCPFError } from '../../errors/domain/InvalidCPFError';

export function validateCPF(email: string) {
  const regex = /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/;
  if (!regex.test(email)) {
    throw new InvalidCPFError(email);
  }
}
