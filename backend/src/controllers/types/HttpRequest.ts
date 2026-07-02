export interface HttpRequest {
  body?: any;
  params?: any;
  headers?: any;
  query?: any;
  file?: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  };
  user?: { id: string; email: string };
}
