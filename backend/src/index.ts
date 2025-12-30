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
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ok, unauthorized } from './helpers/http-helpers';
dotenv.config();

const app = express();

app.use(express.json());

const allowedOrigins = [process.env.FRONTEND, 'http://192.168.0.118:3001'];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by cores'));
    },
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
      return res.send(400).send(unauthorized('Token missing'));
    }

    const payload = jwt.decode(token) as JwtPayload;

    const email = payload.email;
    if (!email) {
      return res.send(400).send(unauthorized('Token provided is invalid'));
    }
    console.log(email);
    const user = await userService.findByEmail(email);

    return res.status(200).json(ok(user));
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
    const { status, query, populate } = req.query;

    const populateFields = String(populate).split(',');

    const page = req.query.page || 1;
    const limit = req.query.limit || 4;

    if (!id) {
      return res.status(400).send({
        status: 400,
        message: 'Missing id param',
      });
    }

    const caseService = new CaseService();

    const casesPaginated = await caseService.findAll(
      {
        query: query ? String(query) : undefined,
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
