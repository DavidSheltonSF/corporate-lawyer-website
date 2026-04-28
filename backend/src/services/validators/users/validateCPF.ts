import { InvalidCPFError } from "../../../errors/domain/InvalidCPFError";

export function validateCPF(cpf: string) {
  const regex = /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/;
  if (!regex.test(cpf)) {
    throw new InvalidCPFError(cpf);
  }
}
