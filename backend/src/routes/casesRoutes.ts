import { Router } from 'express';
import { ICaseController } from '../controllers/case/ICaseController';
import { requireAuth } from '../middlewares/requireAuth';
import { upload } from '../middlewares/uploadFile';
import { expressHttpAdapter } from './adapters/expressHttpAdapter';

export function casesRoutes(router: Router, caseController: ICaseController) {
  router.post('/api/cases', requireAuth, expressHttpAdapter(caseController.create));
  router.put('/api/cases/:id', requireAuth, expressHttpAdapter(caseController.updateById));
  router.get('/api/my/cases/stats', requireAuth, expressHttpAdapter(caseController.getMyStats));
  router.get('/api/cases/stats', requireAuth, expressHttpAdapter(caseController.getStats));
  router.get('/api/cases/:id', expressHttpAdapter(caseController.findById));
  router.get('/api/my/cases', requireAuth, expressHttpAdapter(caseController.findMyCases));
  router.get(
    '/api/my/cases/:id/caseFiles',
    requireAuth,
    expressHttpAdapter(caseController.findFilesByCaseId)
  );
  router.post(
    '/api/my/cases/:id/caseFiles',
    requireAuth,
    upload.single('file'),
    expressHttpAdapter(caseController.uploadMyFile)
  );
  router.delete('/api/cases/:id', requireAuth, expressHttpAdapter(caseController.deleteById));
}
