import { DomainError } from "./DomainError";

export class EntityAlreadyExistsError extends DomainError {
  constructor(message: string = 'Entity aready exists') {
    super(message);
    this.name = EntityAlreadyExistsError.name;
  }
}
