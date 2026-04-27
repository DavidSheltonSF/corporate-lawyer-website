export function createDate(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day);
}
