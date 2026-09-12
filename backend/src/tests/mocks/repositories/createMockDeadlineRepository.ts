import { Mocked } from 'vitest';
import { getClassMethods } from '../../helpers/getClassMethods.js';
import { createMockObject } from '../createMockObject.js';
import { DeadlineRepository } from '../../../repositories/DeadlineRepository.js';
import { MongodbDeadlineRepository } from '../../../database/mongoDB/repositories/MongodbDeadlineRepository.js';

export function createMockDeadlineRepository(): Mocked<DeadlineRepository> {
  const methods = getClassMethods(MongodbDeadlineRepository);
  return createMockObject(methods);
}
