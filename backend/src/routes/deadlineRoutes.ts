import { RequestHandler, Router } from 'express';
import { expressHttpAdapter } from './adapters/expressHttpAdapter.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { IDeadlineController } from '../controllers/deadline/IDeadlineController.js';
import { requireLawyer } from '../middlewares/requireLawyer.js';

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
