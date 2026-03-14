import { CreateClientDTO } from '../../dtos/user/CreateClientDTO';
import { validateCPF } from './validateCPF';
import { validateEmail } from './validateEmail';
import { validateUserName } from './validateUserName';

export function validateNewClient(data: CreateClientDTO) {
  const { firstName, lastName, email, cpf } = data;
  validateUserName(firstName);
  validateUserName(lastName);
  validateEmail(email);
  validateCPF(cpf);
}
