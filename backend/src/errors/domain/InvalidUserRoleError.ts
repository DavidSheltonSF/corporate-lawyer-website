import { DomainError } from "./DomainError.js";

export class InvalidUserRoleError extends DomainError {
  constructor(role: string) {
    super(`Role '${role}' is invalid. User role should be client, lawyer or admin`);
    this.name = InvalidUserRoleError.name;
  }
}
