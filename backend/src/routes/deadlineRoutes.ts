import { RequestHandler, Router } from 'express';
import { expressHttpAdapter } from './adapters/expressHttpAdapter';
import { requireAuth } from '../middlewares/requireAuth';
import { IDeadlineController } from '../controllers/deadline/IDeadlineController';
import { requireLawyer } from '../middlewares/requireLawyer';

export function deadlineRoutes(
  router: Router,
  deadlineController: IDeadlineController,
  requireUser: RequestHandler
) {
  router.post(
    '/api/deadlines',
    requireAuth,
    requireUser,
    requireLawyer,
    expressHttpAdapter(deadlineController.create)
  );
  router.get(
    '/api/cases/:id/deadlines',
    requireAuth,
    requireUser,
    requireLawyer,
    expressHttpAdapter(deadlineController.findByCaseId)
  );
  router.delete(
    '/api/deadlines/:id',
    requireAuth,
    requireUser,
    requireLawyer,
    expressHttpAdapter(deadlineController.deleteById)
  );
}
