import { Application, Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { makeAuthController } from '../factories/makeAuthController';
import { makeCaseController } from '../factories/makeCaseController';

export function configRouter(app: Application) {
  const authController = makeAuthController();
  const caseController = makeCaseController();

  const router = Router();
  router.get('/api/me', requireAuth, authController.getMe);
  router.post('/api/auth', authController.auth);
  router.get('/api/cases/:id', caseController.findById);
  router.get('/api/client/:id/cases/stats', caseController.getStatsByClient);
  router.get('/api/client/:id/cases', caseController.findByClientId);

  app.use(router);
}
