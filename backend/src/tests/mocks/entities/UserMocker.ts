import { CreateClientDTO } from '../../../dtos/user/CreateClientDTO';
import { UserDTO } from '../../../dtos/user/UserDTO';
import { UserRole } from '../../../types/UserRole';
import { WithId } from '../../../types/WithId';
import { GenericMocker } from '../fields/GenericMocker';
import { UserFieldsMocker } from '../fields/UserFieldsMocker';

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
      role: GenericMocker.mockEnum(UserRole),
    };
  }

  static mockUserDTOWithId(): WithId<UserDTO> {
    return { ...UserMocker.mockUserDTO(), id: GenericMocker.mockMongoId().toString() };
  }
}
