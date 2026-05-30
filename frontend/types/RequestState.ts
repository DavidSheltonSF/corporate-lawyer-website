export type RequestState<T = unknown> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ok'; data: T; message?: string }
  | {
      status: 'error';
      code?: string;
      message: string;
      details?: { fields: Record<string, string> };
    };
