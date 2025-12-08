import express, { Request, Response } from 'express';
import cors from 'cors';
import { fakeUserDatabase } from './fakeDatabase/users';

const app = express();

app.use(express.json());

app.use(cors());

const port = 3080;

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Everything is working',
  });
});

app.post('/auth', (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log(body);

    if (!body) {
      return res.status(400).send({
        message: 'Body request is missing',
      });
    }

    const { email, password } = body;
    const user = fakeUserDatabase.find((user) => user.email === email);

    if (!user || user.password !== password) {
      return res.status(401).send({
        message: 'Invalid email or password',
      });
    }

    const fakeToken = email + '-token';
    return res.status(200).send({
      token: fakeToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Something went wron in the server side',
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
