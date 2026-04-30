import { CreateClientDTO } from '../../dtos/user/CreateClientDTO';
import { UserDTO } from '../../dtos/user/UserDTO';
import { InvalidUserRoleError } from '../../errors/domain/InvalidUserRoleError';
import { WithId } from '../../types/WithId';
import { Mocker } from '../helpers/Mocker';
import { UserFieldsMocker } from '../helpers/UserFieldsMocker';

export class UserMocker {
  static mockCreateClientDTO(): CreateClientDTO {
    return {
      firstName: UserFieldsMocker.mockName(),
      lastName: UserFieldsMocker.mockName(),
      email: UserFieldsMocker.mockEmail(),
      cpf: UserFieldsMocker.mockCpf(),
    };
  }

  static mockUserDTO(): UserDTO {
    return {
      firstName: UserFieldsMocker.mockName(),
      lastName: UserFieldsMocker.mockName(),
      email: UserFieldsMocker.mockEmail(),
      cpf: UserFieldsMocker.mockCpf(),
      password: UserFieldsMocker.mockPassword(),
      role: Mocker.mockEnum(InvalidUserRoleError),
    };
  }

  static mockUserDTOWithId(): WithId<UserDTO> {
    return { ...UserMocker.mockUserDTO(), id: Mocker.mockMongoId().toString() };
  }
}
