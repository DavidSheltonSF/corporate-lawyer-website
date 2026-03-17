import { UserDTO } from '../../dtos/user/UserDTO';
import { validateCPF } from './validateCPF';
import { validateEmail } from './validateEmail';
import { validatePassword } from './validatePassword';
import { validateUserName } from './validateUserName';
import { validateUserRole } from './validateUserRole';

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
