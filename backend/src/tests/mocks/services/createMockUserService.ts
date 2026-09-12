import { Mocked } from 'vitest';
import { IUserService } from '../../../services/user/IUserService.js';
import { getClassMethods } from '../../helpers/getClassMethods.js';
import { UserService } from '../../../services/user/UserService.js';
import { createMockObject } from '../createMockObject.js';

export function createMockUserService(): Mocked<IUserService> {
  const methods = getClassMethods(UserService);
  return createMockObject(methods);
}
