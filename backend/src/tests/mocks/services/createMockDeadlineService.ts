import { Mocked } from 'vitest';
import { DeadlineService } from '../../../services/deadline/DeadlineService.js';
import { IDeadlineService } from '../../../services/deadline/IDeadlineService.js';
import { getClassMethods } from '../../helpers/getClassMethods.js';
import { createMockObject } from '../createMockObject.js';

export function createMockDeadlineService(): Mocked<IDeadlineService> {
  const methods = getClassMethods(DeadlineService);
  return createMockObject(methods);
}
