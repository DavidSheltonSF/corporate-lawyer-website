import { Application, json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

export function configMiddlewares(app: Application) {
  app.use(json());
  app.use(cookieParser());

  const allowedOrigin = process.env.FRONTEND;
  if (!allowedOrigin) {
    throw Error('FRONTEND environment variable is not defined');
  }

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (allowedOrigin === origin) {
          return callback(null, true);
        }

        return callback(new Error(`Origin ${origin} not allowed by cors`));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    })
  );
}
