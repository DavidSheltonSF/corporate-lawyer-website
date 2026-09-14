import { UserRole } from '../../../types/UserRole.js';

export function isValidUserRole(role: string) {
  return Object.values(UserRole).includes(role as UserRole);
}
