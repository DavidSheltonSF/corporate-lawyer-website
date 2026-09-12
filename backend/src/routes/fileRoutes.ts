import { Router } from 'express';
import { requireAuth } from '../middlewares/requireAuth.js';
import { expressHttpAdapter } from './adapters/expressHttpAdapter.js';
import { IFileController } from '../controllers/file/IFileController.js';

export function fileRoutes(router: Router, fileController: IFileController) {
  router.get('/api/files/:id', requireAuth, expressHttpAdapter(fileController.findById));
  router.patch('/api/files/:id/', requireAuth, expressHttpAdapter(fileController.rename));
  router.delete('/api/files/:id', requireAuth, expressHttpAdapter(fileController.deleteById));
}
