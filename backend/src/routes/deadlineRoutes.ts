import { Router } from 'express';
import { expressHttpAdapter } from './adapters/expressHttpAdapter';
import { requireAuth } from '../middlewares/requireAuth';
import { IDeadlineController } from '../controllers/deadline/IDeadlineController';

export function deadlineRoutes(router: Router, deadlineController: IDeadlineController) {
  router.post('/api/deadlines', requireAuth, expressHttpAdapter(deadlineController.create));
  router.get(
    '/api/cases/:id/deadlines',
    requireAuth,
    expressHttpAdapter(deadlineController.findByCaseId)
  );
  router.delete('/api/deadlines/:id', expressHttpAdapter(deadlineController.deleteById));
}
