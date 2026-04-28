import { InvalidPasswordError } from "../../../errors/domain/InvalidPasswordError";

export function validatePassword(password: string) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!regex.test(password)) {
    throw new InvalidPasswordError(password);
  }
}
