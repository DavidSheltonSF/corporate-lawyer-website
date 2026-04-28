import { InvalidNameError } from '../../../errors/domain/InvalidNameError';

export function validateUserName(name: string) {
  const regex = /^[A-Za-zÀ-ÿ\s']{2,100}$/;

  if (!name.match(regex)) {
    throw new InvalidNameError(name);
  }
}
