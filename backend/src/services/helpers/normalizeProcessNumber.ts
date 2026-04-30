export function normalizeProcessNumber(processNumber: string): string {
  return processNumber.replace(/\D/g, '')
}
