import { Mocked } from 'vitest';
import { DeadlineService } from '../../../services/deadline/DeadlineService';
import { IDeadlineService } from '../../../services/deadline/IDeadlineService';
import { getClassMethods } from '../../helpers/getClassMethods';
import { createMockObject } from '../createMockObject';

export function createMockDeadlineService(): Mocked<IDeadlineService> {
  const methods = getClassMethods(DeadlineService);
  return createMockObject(methods);
}
