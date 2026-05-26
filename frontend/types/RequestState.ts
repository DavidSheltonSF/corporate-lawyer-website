type ValidationFields = {
  email: string;
  password: string;
};

export interface RequestState {
  status: 'ok' | 'error' | 'loading';
  message?: string;
  code?: string;
  details?: {
    fields: ValidationFields;
  };
}
