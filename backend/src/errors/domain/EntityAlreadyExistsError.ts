export class EntityAlreadyExistsError extends Error {
  constructor(message: string = 'Entity aready exists') {
    super(message);
    this.name = EntityAlreadyExistsError.name;
  }
}
