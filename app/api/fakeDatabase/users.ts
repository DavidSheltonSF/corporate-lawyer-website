import { UserProps } from '@/types/UserProps';
import { WithId } from '@/types/WIthId';

export const fakeUserDatabase: WithId<UserProps>[] = [
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
    id: 'raimundo1',
    firstName: 'Raimundo',
    lastName: 'Teixeira',
    email: 'raimundo@email.com',
    cpf: '18884744474',
    password: 'raimundo123',
    role: 'client',
  },
];
