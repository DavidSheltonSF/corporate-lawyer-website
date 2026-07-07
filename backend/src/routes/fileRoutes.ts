import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { expressHttpAdapter } from './adapters/expressHttpAdapter';
import { IFileController } from '../controllers/file/IFileController';

export function fileRoutes(router: Router, fileController: IFileController) {
  router.get('/api/files/:id', requireAuth, expressHttpAdapter(fileController.findById));
  router.patch('/api/files/:id/', requireAuth, expressHttpAdapter(fileController.rename));
  router.delete('/api/files/:id', requireAuth, expressHttpAdapter(fileController.deleteById));
}
