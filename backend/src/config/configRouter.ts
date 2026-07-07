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
import { makeFileController } from '../factories/controllers/makeFileController';
import { fileRoutes } from '../routes/fileRoutes';

export function configRouter(app: Application) {
  const authController = makeAuthController();
  const caseController = makeCaseController();
  const userController = makeUserController();
  const notificationController = makeNotificationController();
  const deadlineController = makeDeadlineController();
  const fileController = makeFileController();

  const router = Router();
  authRoutes(router, authController);
  casesRoutes(router, caseController);
  usersRoutes(router, userController);
  notificationsRoutes(router, notificationController);
  deadlineRoutes(router, deadlineController);
  fileRoutes(router, fileController);
  testRoutes(router);
  app.use(router);
}
