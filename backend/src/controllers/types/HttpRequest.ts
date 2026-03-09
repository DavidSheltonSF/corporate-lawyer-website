export interface HttpRequest {
  body?: any;
  params?: any;
  query?: any;
  file?: any;
  user?: { id: string; email: string };
}
