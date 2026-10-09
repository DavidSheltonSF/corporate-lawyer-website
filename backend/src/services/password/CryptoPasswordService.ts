import crypto from 'node:crypto';
import { PasswordService } from './PasswordService.js';

export class CryptoPasswordService implements PasswordService {
  generatePassword(length: number = 10): string {
    return crypto.randomBytes(length).toString('base64').slice(0, length);
  }
}
