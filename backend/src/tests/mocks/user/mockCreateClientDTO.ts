import { CreateClientDTO } from '../../../dtos/user/CreateClientDTO';
import { Mocker } from '../../helpers/Mocker';

export function mockCreateClientDTO(): CreateClientDTO {
  return {
    firstName: Mocker.mockName(),
    lastName: Mocker.mockName(),
    email: Mocker.mockEmail(),
    cpf: Mocker.mockCpf(),
  };
}
