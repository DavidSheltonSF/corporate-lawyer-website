import rateLimit from 'express-rate-limit';
import { TooManyRequestsError } from '../errors/presentation/TooManyRequestsError';

export const loginLimiter = rateLimit({
  windowMs: 30 * 1000,
  max: 2,
  handler: (req, res) => {
    throw new TooManyRequestsError();
  },
});
