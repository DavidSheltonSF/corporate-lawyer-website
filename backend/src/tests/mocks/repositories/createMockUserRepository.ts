import { Mocked } from 'vitest';
import { getClassMethods } from '../../helpers/getClassMethods';
import { createMockObject } from '../createMockObject';
import { MongodbUserRepository } from '../../../database/mongoDB/repositories/MongodbUserRepository';
import { UserRepository } from '../../../repositories/UserRepository';

export function createMockUserRepository(): Mocked<UserRepository> {
  const methods = getClassMethods(MongodbUserRepository);
  return createMockObject(methods);
}
