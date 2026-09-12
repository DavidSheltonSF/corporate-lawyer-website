import { Application, Router } from 'express';
import { makeAuthController } from '../factories/controllers/makeAuthController.js';
import { makeCaseController } from '../factories/controllers/makeCaseController.js';
import { casesRoutes } from '../routes/casesRoutes.js';
import { usersRoutes } from '../routes/usersRoutes.js';
import { makeUserController } from '../factories/controllers/makeUserController.js';
import { testRoutes } from '../routes/testRoutes.js';
import { authRoutes } from '../routes/authRoutes.js';
import { notificationsRoutes } from '../routes/notificationsRoutes.js';
import { makeNotificationController } from '../factories/controllers/makeNotificationController.js';
import { makeDeadlineController } from '../factories/controllers/makeDeadlineController.js';
import { deadlineRoutes } from '../routes/deadlineRoutes.js';
import { makeFileController } from '../factories/controllers/makeFileController.js';
import { fileRoutes } from '../routes/fileRoutes.js';
import { makeUserService } from '../factories/services/makeUserService.js';
import { makeRequireUser } from '../factories/middlewares/makeRequireUser.js';

export function configRouter(app: Application) {
  const userService = makeUserService();
  const authController = makeAuthController(userService);
  const caseController = makeCaseController();
  const userController = makeUserController(userService);
  const notificationController = makeNotificationController();
  const deadlineController = makeDeadlineController();
  const fileController = makeFileController();
  const requireUser = makeRequireUser(userService);

  const router = Router();
  authRoutes(router, authController);
  casesRoutes(router, caseController, requireUser);
  usersRoutes(router, userController, requireUser);
  notificationsRoutes(router, notificationController);
  deadlineRoutes(router, deadlineController, requireUser);
  fileRoutes(router, fileController);
  testRoutes(router);
  app.use(router);
}
