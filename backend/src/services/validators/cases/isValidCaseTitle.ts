export function isValidCaseTitle(title: string): boolean {
  return title.trim().length > 15 && title.trim().length < 100;
}
