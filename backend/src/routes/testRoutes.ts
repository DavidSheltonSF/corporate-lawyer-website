import { Request, Response, Router } from 'express';
import { UserModel } from '../models/UserModel';
import { NotificationModel } from '../models/NotificationModel';
import { Types } from 'mongoose';

export function testRoutes(router: Router) {
  router.get('/api/users/', async (req: Request, res: Response) => {
    const response = await UserModel.find();
    res.status(200).json({ data: response });
  });
  router.get('/api/notifications/', async (req: Request, res: Response) => {
    const response = await NotificationModel.find();
    res.status(200).json({ data: response });
  });

  router.post('/api/notifications/', async (req: Request, res: Response) => {
    const response = await NotificationModel.create([
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: 'CASE_CREATED',
        channel: [],
        title: 'Novo processo cadastrado',
        message: 'Processo "Pedido de Abescorpus" cadastrado com sucesso',
        isRead: false,
        metadata: {
          caseId: '69fcce6790233e78aff43b71',
        },
        createdAt: '2026-05-07T17:39:51.393Z',
      },
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: 'CASE_CREATED',
        channel: [],
        title: 'Processo atualizado',
        message: 'Processo "Pedido de Abescorpus" foi atualizado',
        isRead: true,
        metadata: {
          caseId: '69fcce6790233e78aff43b71',
        },
        createdAt: '2026-05-08T10:20:30.123Z',
      },
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: 'CASE_CREATED',
        channel: [],
        title: 'Processo encerrado',
        message: 'Processo "Pedido de Abescorpus" foi encerrado com sucesso',
        isRead: false,
        metadata: {
          caseId: '69fcce6790233e78aff43b71',
        },
        createdAt: '2026-05-09T14:15:45.789Z',
      },
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: 'CASE_CREATED',
        channel: [],
        title: 'Processo encerrado',
        message: 'Processo "Pedido de Abescorpus" foi encerrado com sucesso',
        isRead: false,
        metadata: {
          caseId: '69fcce6790233e78aff43b71',
        },
        createdAt: '2026-05-09T14:15:45.789Z',
      },
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: 'CASE_CREATED',
        channel: [],
        title: 'Processo encerrado',
        message: 'Processo "Pedido de Abescorpus" foi encerrado com sucesso',
        isRead: true,
        metadata: {
          caseId: '69fcce6790233e78aff43b71',
        },
        createdAt: '2026-05-09T14:15:45.789Z',
      },
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: 'CASE_CREATED',
        channel: [],
        title: 'Processo encerrado',
        message: 'Processo "Pedido de Abescorpus" foi encerrado com sucesso',
        isRead: true,
        metadata: {
          caseId: '69fcce6790233e78aff43b71',
        },
        createdAt: '2026-05-09T14:15:45.789Z',
      },
    ]);
    res.status(200).json({ data: response });
  });
  router.delete('/api/notifications/clean', async (req: Request, res: Response) => {
    await NotificationModel.deleteMany({});
    res.sendStatus(200);
  });
}
