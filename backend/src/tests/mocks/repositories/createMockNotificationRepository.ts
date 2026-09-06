import { Mocked } from 'vitest';
import { getClassMethods } from '../../helpers/getClassMethods';
import { createMockObject } from '../createMockObject';
import { MongodbNotificationRepository } from '../../../database/mongoDB/repositories/MongodbNotificationRepository';
import { NotificationRepository } from '../../../repositories/NotificationRepository';

export function createMockNotificationRepository(): Mocked<NotificationRepository> {
  const methods = getClassMethods(MongodbNotificationRepository);
  return createMockObject(methods);
}
