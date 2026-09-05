import { Mocked } from 'vitest';
import { getClassMethods } from '../../helpers/getClassMethods';
import { createMockObject } from '../createMockObject';
import { DeadlineRepository } from '../../../repositories/DeadlineRepository';
import { MongodbDeadlineRepository } from '../../../database/mongoDB/repositories/MongodbDeadlineRepository';

export function createMockDeadlineRepository(): Mocked<DeadlineRepository> {
  const methods = getClassMethods(MongodbDeadlineRepository);
  return createMockObject(methods);
}
