import { type Request, type Response } from 'express';

export interface ICaseController {
  findById: (req: Request, res: Response) => Promise<Response>;
  findByClientId: (req: Request, res: Response) => Promise<Response>;
  getStatsByClient: (req: Request, res: Response) => Promise<Response>;
}
