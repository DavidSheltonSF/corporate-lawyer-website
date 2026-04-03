import { CreateCaseDTO } from '../../../dtos/case/CreateCaseDTO';
import { validateCaseStatus } from './validateCaseStatus';
import { validateCaseTitle } from './validateCaseTitle';
import { validateProcessNumber } from './validateProcessNumber';

export function validateCase(data: CreateCaseDTO) {
  const { title, processNumber, status } = data;

  validateCaseTitle(title);
  validateProcessNumber(processNumber);
  validateCaseStatus(status);
}
