export class InvalidNameError extends Error {
  constructor(name: string) {
    super(
      `Invalid name '${name}'. Names must contain only letters, hyphens, or apostrophes and be between 2 and 100 characters.`
    );
    this.name = InvalidNameError.name;
  }
}
