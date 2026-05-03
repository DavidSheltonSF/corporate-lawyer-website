import { Application, Router } from 'express';
import { makeAuthController } from '../factories/controllers/makeAuthController';
import { makeCaseController } from '../factories/controllers/makeCaseController';
import { casesRoutes } from '../routes/casesRoutes';
import { usersRoutes } from '../routes/usersRoutes';
import { makeUserController } from '../factories/controllers/makeUserController';
import { testRoutes } from '../routes/testRoutes';
import { authRoutes } from '../routes/authRoutes';

export function configRouter(app: Application) {
  const authController = makeAuthController();
  const caseController = makeCaseController();
  const userController = makeUserController();

  const router = Router();
  authRoutes(router, authController);
  casesRoutes(router, caseController);
  usersRoutes(router, userController);
  testRoutes(router);

  app.use(router);
}
