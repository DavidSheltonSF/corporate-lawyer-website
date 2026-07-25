import { RequestHandler, Router } from 'express';
import { ICaseController } from '../controllers/case/ICaseController';
import { requireAuth } from '../middlewares/requireAuth';
import { upload } from '../middlewares/uploadFile';
import { expressHttpAdapter } from './adapters/expressHttpAdapter';
import { requireLawyer } from '../middlewares/requireLawyer';

export function casesRoutes(
  router: Router,
  caseController: ICaseController,
  requireUser: RequestHandler
) {
  router.post(
    '/api/cases',
    requireAuth,
    requireUser,
    requireLawyer,
    expressHttpAdapter(caseController.create)
  );
  router.put(
    '/api/cases/:id',
    requireAuth,
    requireUser,
    expressHttpAdapter(caseController.updateById)
  );
  router.get('/api/my/cases/stats', requireAuth, expressHttpAdapter(caseController.getMyStats));
  router.get(
    '/api/cases/stats',
    requireAuth,
    requireUser,
    requireLawyer,
    expressHttpAdapter(caseController.getStats)
  );
  router.get(
    '/api/cases',
    requireAuth,
    requireUser,
    requireLawyer,
    expressHttpAdapter(caseController.findAll)
  );
  router.get('/api/cases/:id', expressHttpAdapter(caseController.findById));
  router.get('/api/my/cases', requireAuth, expressHttpAdapter(caseController.findMyCases));
  router.get(
    '/api/cases/:id/files',
    requireAuth,
    expressHttpAdapter(caseController.findFilesByCaseId)
  );
  router.post(
    '/api/my/cases/:id/files',
    requireAuth,
    upload.single('file'),
    expressHttpAdapter(caseController.uploadMyFile)
  );
  router.delete(
    '/api/cases/:id',
    requireAuth,
    requireUser,
    expressHttpAdapter(caseController.deleteById)
  );
}
