import { Application, Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { AuthController } from '../controllers/auth.controller';
import { CaseController } from '../controllers/case.controller';

export function configRouter(app: Application) {
  const authController = new AuthController();
  const caseController = new CaseController();

  const router = Router();
  router.get('/api/me', requireAuth, authController.getMe);
  router.post('/api/auth', authController.auth);
  router.get('/api/cases/:id', caseController.findById);
  router.get('/api/client/:id/cases', caseController.findByClientId);

  app.use(router);
}
