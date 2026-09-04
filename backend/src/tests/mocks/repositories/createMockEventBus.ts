import { Mocked } from 'vitest';
import { IEventBus } from '../../../events/IEventBus';
import { getClassMethods } from '../../helpers/getClassMethods';
import { InMemoryEventBus } from '../../../events/InMemoryEventBus';
import { createMockObject } from '../createMockObject';

export function createMockEventBus(): Mocked<IEventBus> {
  const methods = getClassMethods(InMemoryEventBus);
  return createMockObject(methods);
}
