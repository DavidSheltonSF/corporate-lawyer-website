export type RequestState<T = undefined> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'empty_list' }
  | { status: 'ok'; data: T }
  | {
      status: 'error';
      code?: string;
      message: string;
      details?: { fields: Record<string, string> };
    };
