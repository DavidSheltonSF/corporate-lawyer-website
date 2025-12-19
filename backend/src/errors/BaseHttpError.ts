export abstract class BaseHttpError extends Error {
  abstract statusCode: number;
  abstract code: string;

  constructor(message: string) {
    super(message);
    this.name = new.target.name; //Error class being instantiated

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
