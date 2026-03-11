import { Application, Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { makeAuthController } from '../factories/controllers/makeAuthController';
import { makeCaseController } from '../factories/controllers/makeCaseController';
import { casesRoutes } from '../routes/casesRoutes';
import { usersRoutes } from '../routes/usersRoutes';
import { makeUserController } from '../factories/controllers/makeUserController';
import { expressHttpAdapter } from '../routes/adapters/expressHttpAdapter';

export function configRouter(app: Application) {
  const authController = makeAuthController();
  const caseController = makeCaseController();
  const userController = makeUserController();

  const router = Router();
  router.get('/api/me', requireAuth, expressHttpAdapter(authController.getMe));
  router.post('/api/auth', expressHttpAdapter(authController.auth));
  casesRoutes(router, caseController);
  usersRoutes(router, userController);

  app.use(router);
}
