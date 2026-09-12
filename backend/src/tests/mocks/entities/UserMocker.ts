import { CreateClientDTO } from '../../../dtos/user/CreateClientDTO.js';
import { UserDTO } from '../../../dtos/user/UserDTO.js';
import { UserRole } from '../../../types/UserRole.js';
import { WithId } from '../../../types/WithId.js';
import { GenericMocker } from '../fields/GenericMocker.js';
import { UserFieldsMocker } from '../fields/UserFieldsMocker.js';

export class UserMocker {
  static mockCreateClientDTO(): CreateClientDTO {
    return {
      firstName: UserFieldsMocker.mockName(),
      lastName: UserFieldsMocker.mockName(),
      email: UserFieldsMocker.mockEmail(),
      phone: UserFieldsMocker.mockPhone(),
      cpf: UserFieldsMocker.mockCpf(),
    };
  }

  static mockUserDTO(): UserDTO {
    return {
      firstName: UserFieldsMocker.mockName(),
      lastName: UserFieldsMocker.mockName(),
      email: UserFieldsMocker.mockEmail(),
      phone: UserFieldsMocker.mockPhone(),

      cpf: UserFieldsMocker.mockCpf(),
      password: UserFieldsMocker.mockPassword(),
      role: GenericMocker.mockEnum(UserRole),
    };
  }

  static mockUserDTOWithId(): WithId<UserDTO> {
    return { ...UserMocker.mockUserDTO(), id: GenericMocker.mockMongoId().toString() };
  }
}
