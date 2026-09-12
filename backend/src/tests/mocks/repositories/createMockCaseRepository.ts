import { Mocked } from 'vitest';
import { CaseRepository } from '../../../repositories/CaseRepository.js';
import { getClassMethods } from '../../helpers/getClassMethods.js';
import { MongodbCaseRepository } from '../../../database/mongoDB/repositories/MongodbCaseRepository.js';
import { createMockObject } from '../createMockObject.js';

export function createMockCaseRepository(): Mocked<CaseRepository> {
  const methods = getClassMethods(MongodbCaseRepository);
  return createMockObject(methods);
}
