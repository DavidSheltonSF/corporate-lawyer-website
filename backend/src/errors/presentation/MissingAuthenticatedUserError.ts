export class MissingAuthenticatedUserError extends Error {
  constructor() {
    super(
      'Missing authenticated user (id and email). Make sure to use requireAuth middleware to attach user credentials to the request.'
    );
    this.name = MissingAuthenticatedUserError.name;
  }
}
