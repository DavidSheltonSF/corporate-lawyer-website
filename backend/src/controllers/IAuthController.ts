import { type Request, type Response } from 'express';

export interface IAuthController {
  getMe: (req: Request, res: Response) => Promise<Response>;
  auth: (req: Request, res: Response) => Promise<Response>;
}
