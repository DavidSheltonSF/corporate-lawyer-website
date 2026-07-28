export function validateCaseTitle(title: string): boolean {
  return title.trim().length > 15 && title.trim().length < 100;
}
