export function normalizeCaseNumber(caseNumber: string): string {
  return caseNumber.replace(/\D/g, '');
}
