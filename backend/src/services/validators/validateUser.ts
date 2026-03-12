import { CreateUserDTO } from '../../dtos/user/CreateUserDTO';
import { validateCPF } from './validateCPF';
import { validateEmail } from './validateEmail';
import { validatePassword } from './validatePassword';
import { validateUserName } from './validateUserName';
import { validateUserRole } from './validateUserRole';

export function validateUser(data: CreateUserDTO) {
  const { firstName, lastName, email, cpf, password, role } = data;
  validateUserName(firstName);
  validateUserName(lastName);
  validateEmail(email);
  validateCPF(cpf);
  validatePassword(password);
  validateUserRole(role);
}
