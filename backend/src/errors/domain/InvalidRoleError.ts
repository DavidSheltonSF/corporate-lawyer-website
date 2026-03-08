export class InvalidRoleError extends Error {
  constructor(role: string) {
    super(`Role '${role} is invalid. User role should be client, lawyer or admin`);
    this.name = InvalidRoleError.name;
  }
}
