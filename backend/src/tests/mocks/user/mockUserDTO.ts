import { UserDTO } from '../../../dtos/user/UserDTO';
import { UserRole } from '../../../types/UserRole';
import { UserFieldsMocker } from '../../helpers/UserFieldsMocker';

export function mockUserDTO(): UserDTO {
  return {
    firstName: UserFieldsMocker.mockName(),
    lastName: UserFieldsMocker.mockName(),
    email: UserFieldsMocker.mockEmail(),
    cpf: UserFieldsMocker.mockCpf(),
    password: UserFieldsMocker.mockPassword(),
    role: UserFieldsMocker.mockEnum(UserRole),
  };
}
