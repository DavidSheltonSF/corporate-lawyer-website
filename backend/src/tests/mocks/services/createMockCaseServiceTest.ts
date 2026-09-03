import { Mocked } from 'vitest';
import { CaseService } from '../../../services/case/CaseService';
import { ICaseService } from '../../../services/case/ICaseService';
import { getClassMethods } from '../../helpers/getClassMethods';
import { createMockObject } from '../createMockObject';

export function createMockCaseService(): Mocked<ICaseService> {
  const methods = getClassMethods(CaseService);
  return createMockObject(methods);
}
