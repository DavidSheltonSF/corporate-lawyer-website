import { Router } from 'express';
import { expressHttpAdapter } from './adapters/expressHttpAdapter';
import { requireAuth } from '../middlewares/requireAuth';
import { INotificationsController } from '../controllers/notification/INotificationController';

export function notificationsRoutes(router: Router, notificationController: INotificationsController) {
  router.get('/api/notifications/:id', requireAuth, expressHttpAdapter(notificationController.findById));
  router.get(
    '/api/my/notifications/',
    requireAuth,
    expressHttpAdapter(notificationController.findMy)
  );
}
