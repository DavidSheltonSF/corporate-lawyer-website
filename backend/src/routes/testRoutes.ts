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
        channel: ['IN_APP'],
        title: 'Novo processo cadastrado',
        message: 'O processo "Pedido de Habeas Corpus" foi cadastrado com sucesso.',
        isRead: false,
        metadata: {
          caseId: '69fcce6790233e78aff43b71',
        },
        createdAt: '2026-05-06T09:12:14.393Z',
      },
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: 'CASE_CREATED',
        channel: ['IN_APP'],
        title: 'Novo processo cadastrado',
        message: 'O processo "Ação Trabalhista contra Empresa XPTO" foi cadastrado com sucesso.',
        isRead: true,
        metadata: {
          caseId: '69fcce6790233e78aff43b72',
        },
        createdAt: '2026-05-06T11:45:27.120Z',
      },
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: 'CASE_CREATED',
        channel: ['IN_APP'],
        title: 'Novo processo cadastrado',
        message:
          'O processo "Inventário de Bens da Família Oliveira" foi registrado na plataforma.',
        isRead: false,
        metadata: {
          caseId: '69fcce6790233e78aff43b73',
        },
        createdAt: '2026-05-06T15:08:41.902Z',
      },
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: 'CASE_CREATED',
        channel: ['IN_APP'],
        title: 'Novo processo cadastrado',
        message: 'O processo "Revisão de Contrato Imobiliário" foi cadastrado com sucesso.',
        isRead: false,
        metadata: {
          caseId: '69fcce6790233e78aff43b74',
        },
        createdAt: '2026-05-07T08:20:45.789Z',
      },
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: 'CASE_CREATED',
        channel: ['IN_APP'],
        title: 'Novo caso adicionado',
        message: 'O processo "Ação de Guarda Compartilhada" foi adicionado ao sistema.',
        isRead: true,
        metadata: {
          caseId: '69fcce6790233e78aff43b75',
        },
        createdAt: '2026-05-07T10:05:18.456Z',
      },
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: 'CASE_CREATED',
        channel: ['IN_APP'],
        title: 'Novo processo cadastrado',
        message: 'O processo "Cobrança de Dívida Bancária" foi criado com sucesso.',
        isRead: false,
        metadata: {
          caseId: '69fcce6790233e78aff43b76',
        },
        createdAt: '2026-05-07T15:33:51.002Z',
      },
    ]);
    res.status(200).json({ data: response });
  });
  router.delete('/api/notifications/clean', async (req: Request, res: Response) => {
    await NotificationModel.deleteMany({});
    res.sendStatus(200);
  });
}
