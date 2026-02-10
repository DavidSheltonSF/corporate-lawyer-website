import { Router } from "express";
import { ICaseController } from "../controllers/case/ICaseController";
import { requireAuth } from "../middlewares/requireAuth";
import { upload } from "../middlewares/uploadFile";

export function casesRoutes(router: Router, caseController: ICaseController){
  router.get('/api/cases/:id', caseController.findById);
  router.get('/api/client/cases/stats', requireAuth, caseController.getStatsByClient);
  router.get('/api/client/cases', requireAuth, caseController.findByClient);
  router.get('/api/client/cases/:id/caseFiles', requireAuth, caseController.findFilesByCaseId);
  router.post(
    '/api/client/cases/:id/caseFiles',
    requireAuth,
    upload.single('file'),
    caseController.addFile
  );
}