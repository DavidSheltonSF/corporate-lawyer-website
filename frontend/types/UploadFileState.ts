export type UploadFileState =
  | { status: 'idle' }
  | { status: 'ok'; file: File }
  | { status: 'error'; message: string };
