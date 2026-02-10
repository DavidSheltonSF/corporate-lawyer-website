import { Application, Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { makeAuthController } from '../factories/controllers/makeAuthController';
import { makeCaseController } from '../factories/controllers/makeCaseController';
import { casesRoutes } from '../routes/casesRoutes';

export function configRouter(app: Application) {
  const authController = makeAuthController();
  const caseController = makeCaseController();

  const router = Router();
  router.get('/api/me', requireAuth, authController.getMe);
  router.post('/api/auth', authController.auth);
  casesRoutes(router, caseController);

  app.use(router);
}
