import { DomainError } from "./DomainError";

export class InvalidUserRoleError extends DomainError {
  constructor(role: string) {
    super(`Role '${role}' is invalid. User role should be client, lawyer or admin`);
    this.name = InvalidUserRoleError.name;
  }
}
