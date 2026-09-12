import { UserDTO } from '../../../dtos/user/UserDTO.js';
import { ValidationError } from '../../../errors/presentation/ValidationError.js';
import { validateCPF } from './validateCPF.js';
import { validateEmail } from './validateEmail.js';
import { validatePassword } from './validatePassword.js';
import { validateUserName } from './validateUserName.js';
import { validateUserRole } from './validateUserRole.js';

export function validateUser(data: UserDTO) {
  const { firstName, lastName, email, cpf, password, role } = data;
  const invalidFields: Partial<Record<keyof UserDTO, string>> = {};

  if (!validateUserName(firstName)) {
    invalidFields.firstName = `Invalid name '${firstName}'. Names must contain only letters, hyphens, or apostrophes and be between 2 and 100 characters.`;
  }
  if (!validateUserName(lastName)) {
    invalidFields.lastName = `Invalid name '${lastName}'. Names must contain only letters, hyphens, or apostrophes and be between 2 and 100 characters.`;
  }
  if (!validateEmail(email)) {
    invalidFields.email = `Email '${email}' is invalid. Expected format: example@email.com`;
  }
  if (!validateCPF(cpf)) {
    invalidFields.cpf = `CPF '${cpf}' is invalid. Expected format:  000.000.000-00`;
  }
  if (!validatePassword(password)) {
    invalidFields.password = `Password '${password}' is invalid. Password should have at least 8 characters, one number, one special character, one lowercase letter and one uppercase letter.`;
  }
  if (!validateUserRole(role)) {
    invalidFields.role = `Role '${role}' is invalid. User role should be client, lawyer or admin`;
  }

  if (Object.keys(invalidFields).length > 0) {
    throw new ValidationError('Invalid user data', invalidFields);
  }
}
