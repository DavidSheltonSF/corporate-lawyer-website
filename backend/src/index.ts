import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { cleanDatabase } from './config/cleanDatabase';
import { populateDatabase } from './config/populateDatabase';
import { DatabaseConnector } from './config/database';
import { CaseService } from './services/case.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { requireAuth } from './middlewares/requireAuth';
dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
);

const port = 3080;

(async () => {
  await DatabaseConnector.connect();
  // await cleanDatabase();
  // await populateDatabase();

  const userService = new UserService();
  const caseService = new CaseService();
  const authService = new AuthService();

  app.get('/api', (req: Request, res: Response) => {
    res.status(200).send({
      message: 'Everything is working',
    });
  });

  app.get('/api/me', requireAuth, async (req: Request, res: Response) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.send(400).send({
        status: 401,
        message: 'Token missing',
      });
    }

    const email = token.split('-')[0];

    if (!email) {
      return res.send(400).send({
        status: 401,
        message: 'Token provided is invalid',
      });
    }

    const user = await userService.findByEmail(email);

    return res.status(200).json({
      user,
    });
  });

  app.post('/api/auth', async (req: Request, res: Response) => {
    try {
      const body = req.body;

      if (!body) {
        return res.status(400).send({
          code: 'BAD_REQUEST',
          message: 'Body request is missing',
        });
      }

      const { email, password } = body;

      if (!email) {
        return res.status(400).send({
          code: 'BAD_REQUEST',
          message: 'Missing email in the body request',
        });
      }

      if (!password) {
        return res.status(400).send({
          code: 'BAD_REQUEST',
          message: 'Missing password in the body request',
        });
      }

      const auth = await authService.authenticate(email, password);

      return res.status(200).send(auth);
    } catch (error: any) {
      console.log(error);

      // Check if it is Unauthorized error
      if (error.statusCode === 401) {
        return res.status(error.statusCode).send({
          code: error.code,
          message: error.message,
        });
      }

      return res.status(500).send({
        message: 'Something went wron in the server side',
      });
    }
  });

  app.get('/api/client/:id/cases', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, title, processNumber, populate } = req.query;

    const populateFields = String(populate).split(',');

    const page = req.query.page || 1;
    const limit = req.query.limit || 4;

    if (!id) {
      return res.status(400).send({
        status: 400,
        message: 'Missing id param',
      });
    }

    if (title && processNumber) {
      return res.status(400).send({
        status: 400,
        message: "You must send ONLY 'title' OR 'processNumber', not both.",
      });
    }

    const caseService = new CaseService();

    const casesPaginated = await caseService.findAll(
      {
        title: title ? String(title) : undefined,
        processNumber: processNumber ? String(processNumber) : undefined,
        status: status ? String(status) : undefined,
        limit: limit ? Number(limit) : undefined,
        page: page ? Number(page) : undefined,
        client: id ? String(id) : undefined,
      },
      populateFields
    );

    const pagination = {
      ...casesPaginated,
      page,
      limit,
    };

    const response: any = {
      status: 200,
      data: pagination,
    };
    return res.status(200).send(response);
  });

  app.get('/api/cases/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { populate } = req.query;

      const populateFilds = String(populate).split(',');

      if (!id) {
        return res.status(400).send({
          code: 'BAD_REQUEST',
          message: 'Missing id param',
        });
      }

      const foundCase = await caseService.findById(id, populateFilds);

      return res.status(200).send({
        data: foundCase,
      });
    } catch (error: any) {
      console.log(error);

      // Check if it is NotFound error
      if (error.statusCode === 404) {
        return res.status(error.statusCode).send({
          code: error.code,
          message: error.message,
        });
      }

      return res.status(500).send({
        message: 'Something went wron in the server side',
      });
    }
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
  });
})();
