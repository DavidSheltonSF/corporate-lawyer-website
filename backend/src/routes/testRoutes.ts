import { Request, Response, Router } from 'express';
import { UserModel } from '../models/UserModel';
import { NotificationModel } from '../models/NotificationModel';
import { CaseModel } from '../models/CaseModel';
import { fakeNotifications } from '../tests/fakeDatabase/notifications';

export function testRoutes(router: Router) {
  router.get('/api/test/users/', async (req: Request, res: Response) => {
    const response = await UserModel.find();
    res.status(200).json({ data: response });
  });

  router.get('/api/test/cases/', async (req: Request, res: Response) => {
    const response = await CaseModel.find();
    res.status(200).json({ data: response });
  });

  router.put('/api/test/cases/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;
    const response = await CaseModel.findByIdAndUpdate(id, body);
    res.status(200).json({ data: response });
  });

  router.get('/api/test/notifications/', async (req: Request, res: Response) => {
    const response = await NotificationModel.find();
    res.status(200).json({ data: response });
  });

  router.post('/api/test/notifications/', async (req: Request, res: Response) => {
    const response = await NotificationModel.create(fakeNotifications);
    res.status(200).json({ data: response });
  });
  router.delete('/api/test/notifications/clean', async (req: Request, res: Response) => {
    await NotificationModel.deleteMany({});
    res.sendStatus(200);
  });
}
