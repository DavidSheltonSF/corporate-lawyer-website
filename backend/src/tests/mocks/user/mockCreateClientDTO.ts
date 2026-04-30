import { CreateClientDTO } from '../../../dtos/user/CreateClientDTO';
import { UserFieldsMocker } from '../../helpers/UserFieldsMocker';

export function mockCreateClientDTO(): CreateClientDTO {
  return {
    firstName: UserFieldsMocker.mockName(),
    lastName: UserFieldsMocker.mockName(),
    email: UserFieldsMocker.mockEmail(),
    cpf: UserFieldsMocker.mockCpf(),
  };
}
