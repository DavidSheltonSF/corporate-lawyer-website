import { type Application } from 'express';
import { configMiddlewares } from './configMiddlewares';
import { configRouter } from './configRouter';

export function configApp(app: Application) {
  configMiddlewares(app);
  configRouter(app);
}
