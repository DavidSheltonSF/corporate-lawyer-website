import { type Application } from 'express';
import { configMiddlewares } from './configMiddlewares.js';
import { configRouter } from './configRouter.js';
import { configErrorHandler } from './configErrorHandler.js';

export function configApp(app: Application) {
  configMiddlewares(app);
  configRouter(app);
  configErrorHandler(app);
}
