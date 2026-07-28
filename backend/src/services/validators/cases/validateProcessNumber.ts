export function validateProcessNumber(processNumber: string): boolean {
  //NNNNNNN-DD.AAAA.J.TR.OOOO
  const regex = /^\d{7}-?\d{2}\.?\d{4}\.?\d{1}\.?\d{2}\.?\d{4}$/;
  return regex.test(processNumber);
}
