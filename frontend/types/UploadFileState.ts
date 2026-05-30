export type UploadFileState =
  | { status: 'idle' }
  | { status: 'ok'; file: File; message?: string }
  | { status: 'error'; message: string };
