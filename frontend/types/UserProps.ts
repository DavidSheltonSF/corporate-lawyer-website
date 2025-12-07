export interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  password: string;
  role: 'lawyer' | 'client' | 'admin';
}
