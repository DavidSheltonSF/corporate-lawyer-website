import { Application, Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { makeAuthController } from '../factories/controllers/makeAuthController';
import { makeCaseController } from '../factories/controllers/makeCaseController';

export function configRouter(app: Application) {
  const authController = makeAuthController();
  const caseController = makeCaseController();

  const router = Router();
  router.get('/api/me', requireAuth, authController.getMe);
  router.post('/api/auth', authController.auth);
  router.get('/api/cases/:id', caseController.findById);
  router.get('/api/client/:id/cases/stats', caseController.getStatsByClient);
  router.get('/api/client/cases', caseController.findByClient);

  app.use(router);
}
