import 'express';
import { AuthenticatedUser } from './AuthenticatedUser.js';

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser
    }
  }
}
