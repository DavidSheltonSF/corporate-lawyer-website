import { type Request, type Response } from 'express';

export interface ICaseController {
  findById: (req: Request, res: Response) => Promise<Response>;
  findByClient: (req: Request, res: Response) => Promise<Response>;
  getStatsByClient: (req: Request, res: Response) => Promise<Response>;
}
