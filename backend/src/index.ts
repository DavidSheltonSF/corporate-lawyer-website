import express, { Request, Response } from 'express';
import cors from 'cors';
import { fakeUserDatabase } from './fakeDatabase/users';
import { fakeCases } from './fakeDatabase/cases';
import { filterCasesByTitle } from './helpers/filterCasesByTitle';
import { filterCasesByProcessNumber } from './helpers/filterCasesByProcessNumber';
import { getCaseLawyers } from './helpers/getCaseLawyers';
import { paginate } from './helpers/paginate';
import dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
);

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.status(200).send({
    message: 'Everything is working',
  });
});

app.get('/me', (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.send(400).send({
      status: 401,
      message: 'Token missing',
    });
  }

  const email = token.split('-')[0];

  const user = fakeUserDatabase.find((user) => user.email === email);

  return res.status(200).json({
    user,
  });
});

app.post('/auth', (req: Request, res: Response) => {
  try {
    const body = req.body;

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

app.get('/cases/:clientId', (req: Request, res: Response) => {
  const { clientId } = req.params;
  const { status, title, processNumber } = req.query;

  const page = req.query.page || 1;
  const limit = req.query.limit || 4;

  if (title && processNumber) {
    return res.status(400).send({
      status: 400,
      message: "You must send ONLY 'title' OR 'processNumber', not both.",
    });
  }

  let casesByQuery = null;

  const casesByClientId = fakeCases.filter((cas) => cas.clientId === clientId);
  casesByQuery = casesByClientId.slice();

  if (status) {
    casesByQuery = casesByQuery.filter((cas) => cas.status === status);
  }

  if (title) {
    casesByQuery = filterCasesByTitle(casesByQuery, `${title}`);
  }

  if (processNumber) {
    casesByQuery = filterCasesByProcessNumber(casesByQuery, `${processNumber}`);
  }

  let cases = casesByQuery || casesByClientId;
  cases = cases.map((cas) => {
    const lawyers = getCaseLawyers(cas.lawyerIds);

    return { ...cas, lawyers };
  });

  const pagination = {
    cases: paginate(cases, Number(page), Number(limit)),
    page,
    limit,
    total: cases.length,
    totalPages: Math.ceil(cases.length / Number(limit)),
  };

  const response: any = {
    status: 200,
    data: pagination,
  };
  return res.status(200).send(response);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
