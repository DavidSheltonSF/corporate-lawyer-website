import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { configApp } from './config/configApp';
import { MongodbConnector } from './database/mongoDB/MongodbConnector';
import { cleanDatabase } from './tests/cleanDatabase';
import { populateDatabase } from './tests/populateDatabase';

dotenv.config();

const app = express();

configApp(app)

const port = 3080;

(async () => {
  await MongodbConnector.connect();
  // await cleanDatabase();
  // await populateDatabase();

  app.get('/api', (req: Request, res: Response) => {
    res.status(200).send({
      message: 'Everything is working',
    });
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
  });
})();
