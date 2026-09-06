import { Mocked } from 'vitest';
import { getClassMethods } from '../../helpers/getClassMethods';
import { createMockObject } from '../createMockObject';
import { INotificationService } from '../../../services/notification/INotificationService';
import { NotificationService } from '../../../services/notification/NotificationService';

export function createMockNotificationService(): Mocked<INotificationService> {
  const methods = getClassMethods(NotificationService);
  return createMockObject(methods);
}
