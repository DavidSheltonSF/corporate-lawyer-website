export interface UserProps {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  password: string;
}

export const fakeUserDatabase: UserProps[] = [
  {
    id: 1,
    firstName: 'Flávia',
    lastName: 'Santiago',
    email: 'flavia@email.com',
    cpf: '11144744474',
    password: 'flavia123',
  },
];
