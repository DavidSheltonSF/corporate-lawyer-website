import { DeadlineService } from '../../../services/deadline/DeadlineService';
import { IDeadlineService } from '../../../services/deadline/IDeadlineService';
import { getClassMethods } from '../../helpers/getClassMethods';
import { createMockObject } from '../createMockObject';

export function createMockDeadlineService(): jest.Mocked<IDeadlineService> {
  const methods = getClassMethods(DeadlineService);
  return createMockObject(methods);
}
