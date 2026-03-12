export class InvalidCPFError extends Error {
  constructor(cpf: string) {
    super(`CPF '${cpf}' is invalid. Expected format:  000.000.000-00`);
    this.name = InvalidCPFError.name;
  }
}
