import { Router } from 'express';
import { expressHttpAdapter } from './adapters/expressHttpAdapter';
import { requireAuth } from '../middlewares/requireAuth';
import { IAuthController } from '../controllers/auth/IAuthController';
import { loginLimiter } from '../middlewares/loginLimiter';

export function authRoutes(router: Router, authController: IAuthController) {
  router.get('/api/me', requireAuth, expressHttpAdapter(authController.getMe));
  router.post('/api/auth', loginLimiter, expressHttpAdapter(authController.authenticate));
}
