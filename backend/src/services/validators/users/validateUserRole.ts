import { UserRole } from '../../../types/UserRole.js';

export function validateUserRole(role: string) {
  return Object.values(UserRole).includes(role as UserRole);
}
