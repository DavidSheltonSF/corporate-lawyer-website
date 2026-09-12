import { DomainError } from "./DomainError.js";

export class EntityAlreadyExistsError extends DomainError {
  constructor(message: string = 'Entity aready exists') {
    super(message);
    this.name = EntityAlreadyExistsError.name;
  }
}
