import { User } from '../entities/User';
import { WithId } from '../types/WithId';

export class UserMapper {
  static persistenceToDomain(data: any): WithId<User> {
    const { firstName, lastName, email, cpf, role, password } = data;
    return { id: data._id.toString(), firstName, lastName, email, cpf, role, password };
  }
}
