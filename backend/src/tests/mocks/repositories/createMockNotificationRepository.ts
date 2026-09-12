import { Mocked } from 'vitest';
import { getClassMethods } from '../../helpers/getClassMethods.js';
import { createMockObject } from '../createMockObject.js';
import { MongodbNotificationRepository } from '../../../database/mongoDB/repositories/MongodbNotificationRepository.js';
import { NotificationRepository } from '../../../repositories/NotificationRepository.js';

export function createMockNotificationRepository(): Mocked<NotificationRepository> {
  const methods = getClassMethods(MongodbNotificationRepository);
  return createMockObject(methods);
}
