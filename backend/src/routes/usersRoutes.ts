import { Router } from 'express';
import { IUserController } from '../controllers/user/IUserController';
import { expressHttpAdapter } from './adapters/expressHttpAdapter';
import { requireAuth } from '../middlewares/requireAuth';

export function usersRoutes(router: Router, userController: IUserController) {
  router.get('/api/users', expressHttpAdapter(userController.findAll));
  router.get('/api/clients', expressHttpAdapter(userController.findClients));
  router.post('/api/clients', expressHttpAdapter(userController.createClient));
  router.get('/api/users/:id', expressHttpAdapter(userController.findById));
  router.put('/api/clients/:id', requireAuth, expressHttpAdapter(userController.updateById));
  router.delete('/api/clients/:id', requireAuth, expressHttpAdapter(userController.deleteById));
}
