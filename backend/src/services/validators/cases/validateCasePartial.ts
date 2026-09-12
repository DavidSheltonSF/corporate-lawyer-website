import { UpdateCaseDTO } from '../../../dtos/case/UpdateCaseDTO.js';
import { ValidationError } from '../../../errors/presentation/ValidationError.js';
import { CasesStatus } from '../../../types/CasesStatus.js';
import { validateCaseStatus } from './validateCaseStatus.js';
import { validateCaseTitle } from './validateCaseTitle.js';
import { validateProcessNumber } from './validateProcessNumber.js';

export function validateCasePartial(data: UpdateCaseDTO) {
  const { title, processNumber, status } = data;

  const invalidFields: Partial<Record<keyof UpdateCaseDTO, string>> = {};

  if (title && !validateCaseTitle(title)) {
    invalidFields.title = `Title "${title}" is invalid. Expected a string with between 15 and 100 characters.`;
  }

  if (processNumber && !validateProcessNumber(processNumber)) {
    invalidFields.processNumber = `Process number '${processNumber}' is invalid. Expected format: NNNNNNN-DD.AAAA.J.TR.OOOO`;
  }

  if (status && !validateCaseStatus(status)) {
    invalidFields.status = `Status "${status}" is invalid. Expected ${Object.values(CasesStatus).toString()}`;
  }

  if (Object.keys(invalidFields).length > 0) {
    throw new ValidationError('Invalid case data', invalidFields);
  }
}
