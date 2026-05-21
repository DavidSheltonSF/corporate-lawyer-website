import { Application, Router } from 'express';
import { makeAuthController } from '../factories/controllers/makeAuthController';
import { makeCaseController } from '../factories/controllers/makeCaseController';
import { casesRoutes } from '../routes/casesRoutes';
import { usersRoutes } from '../routes/usersRoutes';
import { makeUserController } from '../factories/controllers/makeUserController';
import { testRoutes } from '../routes/testRoutes';
import { authRoutes } from '../routes/authRoutes';
import { notificationsRoutes } from '../routes/notificationsRoutes';
import { makeNotificationController } from '../factories/controllers/makeNotificationController';
import { makeDeadlineController } from '../factories/controllers/makeDeadlineController';
import { deadlineRoutes } from '../routes/deadlineRoutes';

export function configRouter(app: Application) {
  const authController = makeAuthController();
  const caseController = makeCaseController();
  const userController = makeUserController();
  const notificationController = makeNotificationController();
  const deadlineController = makeDeadlineController();

  const router = Router();
  authRoutes(router, authController);
  casesRoutes(router, caseController);
  usersRoutes(router, userController);
  notificationsRoutes(router, notificationController);
  deadlineRoutes(router, deadlineController);
  testRoutes(router);
  app.use(router);
}
