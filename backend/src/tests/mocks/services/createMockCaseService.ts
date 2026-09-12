import { Mocked } from 'vitest';
import { CaseService } from '../../../services/case/CaseService.js';
import { ICaseService } from '../../../services/case/ICaseService.js';
import { getClassMethods } from '../../helpers/getClassMethods.js';
import { createMockObject } from '../createMockObject.js';

export function createMockCaseService(): Mocked<ICaseService> {
  const methods = getClassMethods(CaseService);
  return createMockObject(methods);
}
