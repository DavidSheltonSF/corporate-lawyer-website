import { DomainError } from "./DomainError";

export class InvalidPasswordError extends DomainError {
  constructor(password: string) {
    super(
      `Password '${password}' is invalid. Password should have at least 8 characters, one number, one special character, one lowercase letter and one uppercase letter.`
    );
    this.name = InvalidPasswordError.name;
  }
}
