import { RequestHandler, Router } from 'express';
import { IUserController } from '../controllers/user/IUserController';
import { expressHttpAdapter } from './adapters/expressHttpAdapter';
import { requireAuth } from '../middlewares/requireAuth';
import { requireLawyer } from '../middlewares/requireLawyer';

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
