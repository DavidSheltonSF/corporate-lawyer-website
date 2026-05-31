export function hasEmptyFields(obj: Record<string, string>): boolean {
  return Object.entries(obj).some(([, value]) => value.trim() === '');
}
