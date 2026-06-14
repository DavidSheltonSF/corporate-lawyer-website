import { Request, Response, Router } from 'express';
import { UserModel } from '../models/UserModel';
import { NotificationModel } from '../models/NotificationModel';
import { NotificationType } from '../types/NotificationType';
import { CaseModel } from '../models/CaseModel';

export function testRoutes(router: Router) {
  router.get('/api/test/users/', async (req: Request, res: Response) => {
    const response = await UserModel.find();
    res.status(200).json({ data: response });
  });

  router.get('/api/test/cases/', async (req: Request, res: Response) => {
    const response = await CaseModel.find();
    res.status(200).json({ data: response });
  });

  router.get('/api/test/notifications/', async (req: Request, res: Response) => {
    const response = await NotificationModel.find();
    res.status(200).json({ data: response });
  });

  router.post('/api/test/notifications/', async (req: Request, res: Response) => {
    const response = await NotificationModel.create([
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: NotificationType.CREATED,
        channels: ['IN_APP'],
        title: '1 - Novo processo cadastrado',
        message: 'O processo "Pedido de Habeas Corpus" foi cadastrado com sucesso.',
        isRead: false,
        metadata: {
          caseId: '69fcce6790233e78aff43b71',
        },
        createdAt: '2026-05-06T09:12:14.393Z',
      },
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: NotificationType.UPDATED,
        channels: ['IN_APP'],
        title: '2 - Atualização de caso',
        message:
          'O andamento do processo "Ação Trabalhista contra Empresa XPTO" foi atualizado no sistema.',
        isRead: true,
        metadata: {
          caseId: '69fcce6790233e78aff43b72',
        },
        createdAt: '2026-05-06T11:45:27.120Z',
      },
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: NotificationType.CREATED,
        channels: ['IN_APP'],
        title: '3 - Documento anexado',
        message:
          'O documento de prova para "Inventário de Bens da Família Oliveira" foi anexado com sucesso.',
        isRead: false,
        metadata: {
          caseId: '69fcce6790233e78aff43b73',
        },
        createdAt: '2026-05-06T15:08:41.902Z',
      },
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: NotificationType.CREATED,
        channels: ['IN_APP'],
        title: '4 - Nova tarefa',
        message: 'Uma nova tarefa foi criada para o processo "Revisão de Contrato Imobiliário".',
        isRead: false,
        metadata: {
          caseId: '69fcce6790233e78aff43b74',
        },
        createdAt: '2026-05-07T08:20:45.789Z',
      },
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: NotificationType.CREATED,
        channels: ['IN_APP'],
        title: '5 - Novo caso adicionado',
        message: 'O processo "Ação de Guarda Compartilhada" foi adicionado ao sistema.',
        isRead: true,
        metadata: {
          caseId: '69fcce6790233e78aff43b75',
        },
        createdAt: '2026-05-07T10:05:18.456Z',
      },
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: NotificationType.CREATED,
        channels: ['IN_APP'],
        title: '6 - Prazo atualizado',
        message:
          'O prazo do processo "Cobrança de Dívida Bancária" foi alterado para a próxima semana.',
        isRead: false,
        metadata: {
          caseId: '69fcce6790233e78aff43b76',
        },
        createdAt: '2026-05-07T15:33:51.002Z',
      },
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: NotificationType.CREATED,
        channels: ['IN_APP'],
        title: '7 - Nova audiência marcada',
        message:
          'A audiência do processo "Ação de Divórcio Litigioso" foi marcada para o dia 17/05/2026.',
        isRead: false,
        metadata: {
          caseId: '69fcce6790233e78aff43b77',
        },
        createdAt: '2026-05-08T09:15:22.567Z',
      },
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: NotificationType.CREATED,
        channels: ['IN_APP'],
        title: '8 - Recurso registrado',
        message: 'O recurso de apelação para "Recurso de Apelação em Ação Civil" foi registrado.',
        isRead: true,
        metadata: {
          caseId: '69fcce6790233e78aff43b78',
        },
        createdAt: '2026-05-08T12:47:30.891Z',
      },
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: NotificationType.CREATED,
        channels: ['IN_APP'],
        title: '9 - Sentença publicada',
        message:
          'A sentença do processo "Execução de Sentença Trabalhista" foi publicada no sistema.',
        isRead: false,
        metadata: {
          caseId: '69fcce6790233e78aff43b79',
        },
        createdAt: '2026-05-08T14:22:15.234Z',
      },
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: NotificationType.CREATED,
        channels: ['IN_APP'],
        title: '10 - Notificação de cliente',
        message:
          'O cliente foi notificado sobre a evolução do processo "Ação de Indenização por Danos Morais".',
        isRead: false,
        metadata: {
          caseId: '69fcce6790233e78aff43b7a',
        },
        createdAt: '2026-05-08T16:58:44.678Z',
      },
      {
        userId: 'a3f9c1e70d4b8a2fff12ac90',
        type: NotificationType.CREATED,
        channels: ['IN_APP'],
        title: '11 - Relatório disponível',
        message:
          'O relatório do processo "Revisão de Pensão Alimentícia" está disponível para download.',
        isRead: true,
        metadata: {
          caseId: '69fcce6790233e78aff43b7b',
        },
        createdAt: '2026-05-09T10:35:19.445Z',
      },
    ]);
    res.status(200).json({ data: response });
  });
  router.delete('/api/notifications/clean', async (req: Request, res: Response) => {
    await NotificationModel.deleteMany({});
    res.sendStatus(200);
  });
}
