import { HttpCode } from './HttpCode';

export interface HttpResponse<T> {
  data?: T;
  message?: string;
  code: HttpCode;
}
