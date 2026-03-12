import { InvalidEmailError } from '../../errors/domain/InvalidEmailError.ts';

export function validateEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    throw new InvalidEmailError(email);
  }
}
