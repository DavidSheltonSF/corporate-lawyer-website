import { Mocked } from 'vitest';
import { getClassMethods } from '../../helpers/getClassMethods.js';
import { createMockObject } from '../createMockObject.js';
import { INotificationService } from '../../../services/notification/INotificationService.js';
import { NotificationService } from '../../../services/notification/NotificationService.js';

export function createMockNotificationService(): Mocked<INotificationService> {
  const methods = getClassMethods(NotificationService);
  return createMockObject(methods);
}
