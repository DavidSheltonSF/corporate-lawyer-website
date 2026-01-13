export function getMissingFields(object: Record<string, any>, requiredFields: string[]): string[] {
  return requiredFields.filter((field) => object[field] === undefined || object[field] === null);
}
