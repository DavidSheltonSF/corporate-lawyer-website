import { Mocked } from 'vitest';
import { CaseRepository } from '../../../repositories/CaseRepository';
import { getClassMethods } from '../../helpers/getClassMethods';
import { MongodbCaseRepository } from '../../../database/mongoDB/repositories/MongodbCaseRepository';
import { createMockObject } from '../createMockObject';

export function createMockCaseRepository(): Mocked<CaseRepository> {
  const methods = getClassMethods(MongodbCaseRepository);
  return createMockObject(methods);
}
