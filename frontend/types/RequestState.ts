type ValidationFields = {
  email: string;
  password: string;
};

export type RequestState<T = undefined> =
  | { status: 'loading' }
  | { status: 'ok'}
  | { status: 'error'; code?: string; message: string; details?: { fields: ValidationFields } };
