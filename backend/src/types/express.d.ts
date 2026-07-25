import 'express';
import { AuthenticatedUser } from './AuthenticatedUser';

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser
    }
  }
}
