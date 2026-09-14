import { UserDTO } from '../../../dtos/user/UserDTO.js';
import { ValidationError } from '../../../errors/presentation/ValidationError.js';
import { isValidCPF } from './isValidCPF.js';
import { isValidEmail } from './isValidEmail.js';
import { isValidPassword } from './isValidPassword.js';
import { isValidUserName } from './isValidUserName.js';
import { isValidUserRole } from './isValidUserRole.js';

export function validateUserPartial(data: Partial<UserDTO>) {
  const { firstName, lastName, email, cpf, password, role } = data;
  const invalidFields: Partial<Record<keyof UserDTO, string>> = {};

  if (firstName && !isValidUserName(firstName)) {
    invalidFields.firstName = `Invalid name '${firstName}'. Names must contain only letters, hyphens, or apostrophes and be between 2 and 100 characters.`;
  }

  if (lastName && !isValidUserName(lastName)) {
    invalidFields.lastName = `Invalid name '${lastName}'. Names must contain only letters, hyphens, or apostrophes and be between 2 and 100 characters.`;
  }

  if (email && !isValidEmail(email)) {
    invalidFields.email = `Email '${email}' is invalid. Expected format: example@email.com`;
  }

  if (cpf && !isValidCPF(cpf)) {
    invalidFields.cpf = `CPF '${cpf}' is invalid. Expected format:  000.000.000-00`;
  }

  if (password && !isValidPassword(password)) {
    invalidFields.password = `Password '${password}' is invalid. Password should have at least 8 characters, one number, one special character, one lowercase letter and one uppercase letter.`;
  }

  if (role && !isValidUserRole(role)) {
    invalidFields.role = `Role '${role}' is invalid. User role should be client, lawyer or admin`;
  }

  if (Object.keys(invalidFields).length > 0) {
    throw new ValidationError('Invalid user data', invalidFields);
  }
}
