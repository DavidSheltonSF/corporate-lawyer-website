import { Router } from 'express';
import { IUserController } from '../controllers/user/IUserController';
import { expressHttpAdapter } from './adapters/expressHttpAdapter';
import { requireAuth } from '../middlewares/requireAuth';

export function usersRoutes(router: Router, userController: IUserController) {
  router.get('/api/clients', requireAuth, expressHttpAdapter(userController.findClients));
  router.post('/api/clients', requireAuth, expressHttpAdapter(userController.createClient));
  router.get('/api/users/:id', requireAuth, expressHttpAdapter(userController.findById));
  router.get('/api/clients/:id', requireAuth, expressHttpAdapter(userController.findClientById));
  router.put('/api/users/:id', requireAuth, expressHttpAdapter(userController.updateById));
  router.delete('/api/users/:id', requireAuth, expressHttpAdapter(userController.deleteById));
}
