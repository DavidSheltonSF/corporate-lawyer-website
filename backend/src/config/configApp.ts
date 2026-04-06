import { type Application } from 'express';
import { configMiddlewares } from './configMiddlewares';
import { configRouter } from './configRouter';
import { configErrorHandler } from './configErrorHandler';

export function configApp(app: Application) {
  configMiddlewares(app);
  configRouter(app);
  configErrorHandler(app);
}
