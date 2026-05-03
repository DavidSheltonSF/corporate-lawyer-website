import { Request, Response, Router } from 'express';
import { UserModel } from '../models/UserModel';
import { NotificationModel } from '../models/NotificationModel';

export function testRoutes(router: Router) {
  router.get('/api/users/', async (req: Request, res: Response) => {
    const response = await UserModel.find();
    res.status(200).json({ data: response });
  });
  router.get('/api/notifications/', async (req: Request, res: Response) => {
    const response = await NotificationModel.find();
    res.status(200).json({ data: response });
  });
  router.delete('/api/notifications/clean', async (req: Request, res: Response) => {
    await NotificationModel.deleteMany({});
    res.sendStatus(200);
  });
}
