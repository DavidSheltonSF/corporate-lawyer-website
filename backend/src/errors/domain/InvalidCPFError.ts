import { DomainError } from "./DomainError";

export class InvalidCPFError extends DomainError {
  constructor(cpf: string) {
    super(`CPF '${cpf}' is invalid. Expected format:  000.000.000-00`);
    this.name = InvalidCPFError.name;
  }
}
