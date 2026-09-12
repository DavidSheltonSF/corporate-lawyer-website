import { Mocked } from 'vitest';
import { IEventBus } from '../../../events/IEventBus.js';
import { getClassMethods } from '../../helpers/getClassMethods.js';
import { InMemoryEventBus } from '../../../events/InMemoryEventBus.js';
import { createMockObject } from '../createMockObject.js';

export function createMockEventBus(): Mocked<IEventBus> {
  const methods = getClassMethods(InMemoryEventBus);
  return createMockObject(methods);
}
