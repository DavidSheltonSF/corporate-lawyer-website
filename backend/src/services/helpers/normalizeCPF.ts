export function normalizeCPF(cpf: string): string {
  return cpf.replace(/\D/g, '');
}
