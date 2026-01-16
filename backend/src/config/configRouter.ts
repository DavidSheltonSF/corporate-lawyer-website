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
  router.get('/api/client/cases/stats', requireAuth, caseController.getStatsByClient);
  router.get('/api/client/cases', requireAuth, caseController.findByClient);

  app.use(router);
}
