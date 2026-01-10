import { UserRole } from "../types/UserRole";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  password: string;
  role: UserRole;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
