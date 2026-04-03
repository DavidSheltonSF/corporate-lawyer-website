import { InvalidCaseTitleError } from '../../../errors/domain/InvalidCaseTitleError';

export function validateCaseTitle(title: string) {
  if (title.trim().length < 15 || title.trim().length > 100) {
    throw new InvalidCaseTitleError(title);
  }
}
