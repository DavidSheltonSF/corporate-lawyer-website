
/**
 * Removes diacritics, spaces in the start and in the end of string and turns string to lowercase
 * @param rawString 
 * @returns string
 */
export function normalizeString(rawString: string): string {
  return rawString
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim()
    .toLowerCase();
}
