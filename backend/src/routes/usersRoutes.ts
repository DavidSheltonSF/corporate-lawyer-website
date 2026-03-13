import { Router } from 'express';
import { IUserController } from '../controllers/user/IUserController';
import { expressHttpAdapter } from './adapters/expressHttpAdapter';

export function usersRoutes(router: Router, userController: IUserController) {
  router.get('/api/users', expressHttpAdapter(userController.findAll));
  router.get('/api/clients', expressHttpAdapter(userController.findClients));
  router.get('/api/users/:id', expressHttpAdapter(userController.findById));
  router.post('/api/users', expressHttpAdapter(userController.create));
}
