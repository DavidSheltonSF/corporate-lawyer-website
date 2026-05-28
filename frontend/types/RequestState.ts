type ValidationFields = {
  email: string;
  password: string;
};

export type RequestState<T = undefined> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'empty'}
  | { status: 'ok'; data?: T }
  | { status: 'error'; code?: string; message: string; details?: { fields: ValidationFields } };
