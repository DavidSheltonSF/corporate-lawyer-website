import { BadRequestError } from '../errors/presentation/BadRequestError';

export function checkMissingFields(object: Record<string, any>, requiredFields: string[]): void {
  const missingFields = requiredFields.filter(
    (field) => object[field] === undefined || object[field] === null
  );
  if (missingFields.length > 0) {
    throw new BadRequestError(`Missing required fields: ${missingFields.toString()}`);
  }
}
