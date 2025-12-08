import { User } from "../types/User";
import { WithId } from "../types/WithId";

export const fakeUserDatabase: WithId<User>[] = [
  {
    id: 'flavia1',
    firstName: 'Flávia',
    lastName: 'Santiago',
    email: 'flavia@email.com',
    cpf: '11144744474',
    password: 'flavia123',
    role: 'lawyer',
  },
  {
    id: 'carla1',
    firstName: 'Carla',
    lastName: 'Medeiros',
    email: 'carla@email.com',
    cpf: '11148814474',
    password: 'carla123',
    role: 'lawyer',
  },
  {
    id: 'raimundo1',
    firstName: 'Raimundo',
    lastName: 'Teixeira',
    email: 'raimundo@email.com',
    cpf: '18884744474',
    password: 'raimundo123',
    role: 'client',
  },
];
