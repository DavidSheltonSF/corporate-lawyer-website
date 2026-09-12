import { InvalidUserRoleError } from '../../../errors/domain/InvalidUserRoleError.js';
import { UserRole } from '../../../types/UserRole.js';

export function validateUserRole(role: string) {
  let userRole: UserRole;
  switch (role) {
    case UserRole.admin:
      userRole = UserRole.admin;
      break;

    case UserRole.client:
      userRole = UserRole.client;
      break;

    case UserRole.lawyer:
      userRole = UserRole.lawyer;
      break;

    default:
      throw new InvalidUserRoleError(role);
  }
}
