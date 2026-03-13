export interface RequestState  {
  status: 'ok' | 'error' | 'loading',
  message?: string
}
