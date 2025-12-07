import express, { Request, Response } from 'express';

const app = express();
const port = 3080;

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Everything is working',
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
