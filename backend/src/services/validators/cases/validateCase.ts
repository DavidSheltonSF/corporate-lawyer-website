import { CreateCaseDTO } from '../../../dtos/case/CreateCaseDTO.js';
import { ValidationError } from '../../../errors/presentation/ValidationError.js';
import { CasesStatus } from '../../../types/CasesStatus.js';
import { isValidCaseStatus } from './isValidCaseStatus.js';
import { isValidCaseTitle } from './isValidCaseTitle.js';
import { isValidCaseNumber } from './isValidCaseNumber.js';

export function validateCase(data: CreateCaseDTO) {
  const { title, caseNumber, status } = data;
  const invalidFields: Partial<Record<keyof CreateCaseDTO, string>> = {};

  if (!isValidCaseTitle(title)) {
    invalidFields.title = `Title "${title}" is invalid. Expected a string with between 15 and 100 characters.`;
  }

  if (!isValidCaseNumber(caseNumber)) {
    invalidFields.caseNumber = `Case number '${caseNumber}' is invalid. Expected format: NNNNNNN-DD.AAAA.J.TR.OOOO`;
  }

  if (!isValidCaseStatus(status)) {
    invalidFields.status = `Status "${status}" is invalid. Expected ${Object.values(CasesStatus).toString()}`;
  }

  if (Object.keys(invalidFields).length > 0) {
    throw new ValidationError('Invalid case data', invalidFields);
  }
}
