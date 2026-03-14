import crypto from 'crypto';

export function generateTemporaryPassword(length: number = 10): string {
  return crypto.randomBytes(length).toString('base64').slice(0, length);
}
