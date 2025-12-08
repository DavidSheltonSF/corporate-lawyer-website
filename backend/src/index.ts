import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

const port = 3080;

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Everything is working',
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
