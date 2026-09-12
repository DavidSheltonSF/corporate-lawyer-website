import { UserDTO } from '../../../dtos/user/UserDTO.js';
import { validateCPF } from './validateCPF.js';
import { validateEmail } from './validateEmail.js';
import { validatePassword } from './validatePassword.js';
import { validateUserName } from './validateUserName.js';
import { validateUserRole } from './validateUserRole.js';

export function validateUserPartial(data: Partial<UserDTO>) {
  const { firstName, lastName, email, cpf, password, role } = data;

  if (firstName) {
    validateUserName(firstName);
  }
  if (lastName) {
    validateUserName(lastName);
  }
  if (email) {
    validateEmail(email);
  }
  if (cpf) {
    validateCPF(cpf);
  }
  if (password) {
    validatePassword(password);
  }

  if (role) {
    validateUserRole(role);
  }
}
