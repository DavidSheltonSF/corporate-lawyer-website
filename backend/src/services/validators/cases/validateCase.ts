import { CreateCaseDTO } from '../../../dtos/case/CreateCaseDTO';
import { ValidationError } from '../../../errors/presentation/ValidationError';
import { CasesStatus } from '../../../types/CasesStatus';
import { validateCaseStatus } from './validateCaseStatus';
import { validateCaseTitle } from './validateCaseTitle';
import { validateProcessNumber } from './validateProcessNumber';

export function validateCase(data: CreateCaseDTO) {
  const { title, processNumber, status } = data;
  const invalidFields: Partial<Record<keyof CreateCaseDTO, string>> = {};

  if (!validateCaseTitle(title)) {
    invalidFields.title = `Title "${title}" is invalid. Expected a string with between 15 and 100 characters.`;
  }

  if (!validateProcessNumber(processNumber)) {
    invalidFields.processNumber = `Process number '${processNumber}' is invalid. Expected format: NNNNNNN-DD.AAAA.J.TR.OOOO`;
  }

  if (!validateCaseStatus(status)) {
    invalidFields.status = `Status "${status}" is invalid. Expected ${Object.values(CasesStatus).toString()}`;
  }

  if (Object.keys(invalidFields).length > 0) {
    throw new ValidationError('Invalid case data', invalidFields);
  }
}
