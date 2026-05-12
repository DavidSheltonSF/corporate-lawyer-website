import { UserRole } from './UserRole';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
  role: UserRole;
}
