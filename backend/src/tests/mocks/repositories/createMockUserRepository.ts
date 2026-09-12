import { Mocked } from 'vitest';
import { getClassMethods } from '../../helpers/getClassMethods.js';
import { createMockObject } from '../createMockObject.js';
import { MongodbUserRepository } from '../../../database/mongoDB/repositories/MongodbUserRepository.js';
import { UserRepository } from '../../../repositories/UserRepository.js';

export function createMockUserRepository(): Mocked<UserRepository> {
  const methods = getClassMethods(MongodbUserRepository);
  return createMockObject(methods);
}
