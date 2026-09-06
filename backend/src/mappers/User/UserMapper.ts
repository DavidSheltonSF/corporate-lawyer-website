import { UserDTO } from '../../dtos/user/UserDTO';
import { UserResponseDTO } from '../../dtos/user/UserResponseDTO';
import { WithId } from '../../types/WithId';

export class UserMapper {
  static persistenceToPresentation(data: any): WithId<UserDTO> {
    const { firstName, lastName, email, phone, cpf, role, password } = data;
    return { id: data._id.toString(), firstName, lastName, email, phone, cpf, role, password };
  }

  static toResponse(user: WithId<UserDTO>): WithId<UserResponseDTO> {
    const { password, ...safeUser } = user;
    return safeUser;
  }
}
