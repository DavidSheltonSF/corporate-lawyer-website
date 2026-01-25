export type RequestState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ok'; message: string };
