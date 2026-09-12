import { UserDTO } from '../../../dtos/user/UserDTO.js';
import { validateCPF } from './validateCPF.js';
import { validateEmail } from './validateEmail.js';
import { validatePassword } from './validatePassword.js';
import { validateUserName } from './validateUserName.js';
import { validateUserRole } from './validateUserRole.js';

export function validateUser(data: UserDTO) {
  const { firstName, lastName, email, cpf, password, role } = data;
  validateUserName(firstName);
  validateUserName(lastName);
  validateEmail(email);
  validateCPF(cpf);
  validatePassword(password);
  validateUserRole(role);
}
