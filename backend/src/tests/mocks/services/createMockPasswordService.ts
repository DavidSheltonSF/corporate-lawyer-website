import { Mocked } from 'vitest';
import { PasswordService } from '../../../services/password/PasswordService.js';
import { getClassMethods } from '../../helpers/getClassMethods.js';
import { CryptoPasswordService } from '../../../services/password/CryptoPasswordService.js';
import { createMockObject } from '../createMockObject.js';

export function createMockPasswordService(): Mocked<PasswordService> {
  const methods = getClassMethods(CryptoPasswordService);
  return createMockObject(methods);
}
