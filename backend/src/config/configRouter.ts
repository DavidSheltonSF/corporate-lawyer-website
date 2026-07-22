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
import { makeRequireLawyer } from '../factories/middlewares/makeRequireLawyer';
import { makeUserService } from '../factories/services/makeUserService';

export function configRouter(app: Application) {
  const userService = makeUserService();
  const authController = makeAuthController(userService);
  const caseController = makeCaseController(userService);
  const userController = makeUserController(userService);
  const notificationController = makeNotificationController();
  const deadlineController = makeDeadlineController(userService);
  const fileController = makeFileController();
  const requireLawyer = makeRequireLawyer(userService);

  const router = Router();
  authRoutes(router, authController);
  casesRoutes(router, caseController, requireLawyer);
  usersRoutes(router, userController);
  notificationsRoutes(router, notificationController);
  deadlineRoutes(router, deadlineController);
  fileRoutes(router, fileController);
  testRoutes(router);
  app.use(router);
}
