import { Router } from 'express';
import { expressHttpAdapter } from './adapters/expressHttpAdapter.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { IAuthController } from '../controllers/auth/IAuthController.js';
import { loginLimiter } from '../middlewares/loginLimiter.js';

export function authRoutes(router: Router, authController: IAuthController) {
  router.get('/api/me', requireAuth, expressHttpAdapter(authController.getMe));
  router.post('/api/auth', loginLimiter, expressHttpAdapter(authController.authenticate));
}
