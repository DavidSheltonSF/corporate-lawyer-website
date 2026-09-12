import { RequestHandler, Router } from 'express';
import { IUserController } from '../controllers/user/IUserController.js';
import { expressHttpAdapter } from './adapters/expressHttpAdapter.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireLawyer } from '../middlewares/requireLawyer.js';

export function usersRoutes(
  router: Router,
  userController: IUserController,
  requireUser: RequestHandler
) {
  router.get(
    '/api/clients',
    requireAuth,
    requireUser,
    requireLawyer,
    expressHttpAdapter(userController.findClients)
  );
  router.post(
    '/api/clients',
    requireAuth,
    requireUser,
    requireLawyer,
    expressHttpAdapter(userController.createClient)
  );
  router.get(
    '/api/users/:id',
    requireAuth,
    requireUser,
    requireLawyer,
    expressHttpAdapter(userController.findById)
  );
  router.put(
    '/api/users/:id',
    requireAuth,
    requireUser,
    requireLawyer,
    expressHttpAdapter(userController.updateById)
  );
  router.delete(
    '/api/users/:id',
    requireAuth,
    requireUser,
    requireLawyer,
    expressHttpAdapter(userController.deleteById)
  );
}
