import { Mocked } from 'vitest';
import { IUserService } from '../../../services/user/IUserService';
import { getClassMethods } from '../../helpers/getClassMethods';
import { UserService } from '../../../services/user/UserService';
import { createMockObject } from '../createMockObject';

export function createMockUserService(): Mocked<IUserService> {
  const methods = getClassMethods(UserService);
  return createMockObject(methods);
}
