import { UserDTO } from '../../../dtos/user/UserDTO';
import { UserRole } from '../../../types/UserRole';
import { Mocker } from '../../helpers/Mocker';

export function mockUserDTO(): UserDTO {
  return {
    firstName: Mocker.mockName(),
    lastName: Mocker.mockName(),
    email: Mocker.mockEmail(),
    cpf: Mocker.mockCpf(),
    password: Mocker.mockPassword(),
    role: Mocker.mockEnum(UserRole),
  };
}
