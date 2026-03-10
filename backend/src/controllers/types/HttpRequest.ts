export interface HttpRequest {
  body?: any;
  params?: any;
  headers?: any;
  query?: any;
  file?: any;
  user?: { id: string; email: string };
}
