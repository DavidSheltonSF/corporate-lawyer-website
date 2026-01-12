export class ServerError extends Error {
  constructor() {
    super('Houve um erro no servidor');
    this.name = 'ServerError';
  }
}
