import { DomainError } from "./DomainError";

export class InvalidProcessNumberError extends DomainError {
  constructor(processNumber: string) {
    super(
      `Process number '${processNumber}' is invalid. Expected format: NNNNNNN-DD.AAAA.J.TR.OOOO`
    );
    this.name = InvalidProcessNumberError.name;
  }
}
