import { UserRole } from "./UserRole";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  password: string;
  role: UserRole;
}
