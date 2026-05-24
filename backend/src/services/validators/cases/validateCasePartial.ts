import { UpdateCaseDTO } from '../../../dtos/case/UpdateCaseDTO';
import { validateCaseStatus } from './validateCaseStatus';
import { validateCaseTitle } from './validateCaseTitle';
import { validateProcessNumber } from './validateProcessNumber';

export function validateCasePartial(data: UpdateCaseDTO) {
  const { title, processNumber, status } = data;

  if (title) {
    validateCaseTitle(title);
  }

  if (processNumber) {
    validateProcessNumber(processNumber);
  }

  if (status) {
    validateCaseStatus(status);
  }
}
